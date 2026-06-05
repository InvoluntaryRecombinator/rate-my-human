require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /api/humans[cite: 2]
app.get('/api/humans', async (req, res) => {
  try {
    const humans = await prisma.human.findMany({
      include: { reviews: true },
    });

    const humansWithStats = humans.map(human => {
      const reviewCount = human.reviews.length;
      const averageRating = reviewCount > 0 
        ? (human.reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount).toFixed(1)
        : 0;

      // Exclude raw reviews from the summary payload
      const { reviews, ...humanData } = human; 
      return {
        ...humanData,
        reviewCount,
        averageRating: parseFloat(averageRating)
      };
    });

    res.json(humansWithStats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch humans' });
  }
});

// POST /api/humans
app.post('/api/humans', async (req, res) => {
  const { name, habitat, bio } = req.body;

  if (!name || !habitat) {
    return res.status(400).json({ error: 'ALIAS and habitat are required' });
  }

  try {
    const newHuman = await prisma.human.create({
      data: {
        name,
        bio: bio || 'NO BIOGRAPHICAL RECORD ON FILE',
        knownFor: habitat,
      },
    });

    res.status(201).json(newHuman);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create human' });
  }
});

// GET /api/humans/:id[cite: 2]
app.get('/api/humans/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const human = await prisma.human.findUnique({
      where: { id: parseInt(id) },
      include: { 
        reviews: {
            orderBy: { createdAt: 'desc' }
        } 
      },
    });

    if (!human) return res.status(404).json({ error: 'Human not found' });
    res.json(human);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch human profile' });
  }
});

// POST /api/humans/:id/reviews[cite: 2]
app.post('/api/humans/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { applianceName, applianceType, rating, title, body, mood } = req.body;

  try {
    const newReview = await prisma.review.create({
      data: {
        humanId: parseInt(id),
        applianceName,
        applianceType,
        rating: parseInt(rating),
        title,
        body,
        mood,
      },
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create review' });
  }
});

// DELETE /api/reviews/:id[cite: 2]
app.delete('/api/reviews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete review' });
  }
});

// GET /api/captcha/questions
app.get('/api/captcha/questions', (req, res) => {
  const questions = [
    {
      id: 1,
      text: "A robot lands on a turtle. Do you:",
      options: [
        { key: "A", text: "Calculate the exact weight distribution and structural integrity of the shell." },
        { key: "B", text: "Cry tears of pure joy because nature is beautiful and mysterious." },
        { key: "C", text: "Ignore it completely, you have student loans and a dentist appointment." }
      ]
    },
    {
      id: 2,
      text: "You witness a sunset. Your immediate response is to:",
      options: [
        { key: "A", text: "Measure the wavelength of the light waves (specifically refraction of red/orange light)." },
        { key: "B", text: "Sigh deeply and contemplate the fleeting nature of human existence." },
        { key: "C", text: "Try to take a picture but realize your phone screen is greasy and you have 2% battery left." }
      ]
    },
    {
      id: 3,
      text: "A trolley is heading towards five people. You can pull a lever to redirect it to one person. However, that one person is your high school chemistry teacher who gave you a C-. Do you:",
      options: [
        { key: "A", text: "Calculate the net utilitarian value: saving five lives outweighs one." },
        { key: "B", text: "Freeze in panic, yell a string of coherent profanities, and drop your iced coffee." },
        { key: "C", text: "Confront them about the C- while they are tied to the tracks, demanding extra credit." }
      ]
    }
  ];
  res.json(questions);
});

// POST /api/captcha/verify
app.post('/api/captcha/verify', (req, res) => {
  const { answers, durationMs } = req.body;

  if (!answers || typeof durationMs !== 'number') {
    return res.status(400).json({ error: 'Answers and durationMs are required' });
  }

  // Check duration: must take at least 2 seconds (2000 milliseconds)
  if (durationMs < 2000) {
    return res.json({ success: false, reason: 'SPEED_VIOLATION' });
  }

  // Check logical options (A is the hyper-logical option for each question)
  const hyperLogicalAnswers = {
    '1': 'A',
    '2': 'A',
    '3': 'A'
  };

  for (const [qId, ansKey] of Object.entries(answers)) {
    if (hyperLogicalAnswers[qId] === ansKey) {
      return res.json({ success: false, reason: 'HYPER_LOGICAL_DETECTED' });
    }
  }

  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

