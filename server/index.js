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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});