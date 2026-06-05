require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'troll-photos';
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const EXTENSION_BY_MIME = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_UPLOAD_BYTES,
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_IMAGE_TYPES.has(file.mimetype)) {
      cb(new Error('Only jpeg, png, and webp images are allowed'));
      return;
    }

    cb(null, true);
  },
});

app.use(cors());
app.use(express.json());

async function uploadPhotoToStorage(file, folder, prefix) {
  if (!file) return {};
  if (!supabase) {
    throw new Error('Supabase Storage is not configured');
  }

  const extension = EXTENSION_BY_MIME[file.mimetype];
  const photoPath = `${folder}/${prefix}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(photoPath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(photoPath);

  return {
    photoPath,
    photoUrl: data.publicUrl,
  };
}

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
app.post('/api/humans', upload.single('photo'), async (req, res) => {
  const { name, habitat, bio } = req.body;

  if (!name || !habitat) {
    return res.status(400).json({ error: 'ALIAS and habitat are required' });
  }

  let newHuman;

  try {
    newHuman = await prisma.human.create({
      data: {
        name,
        bio: bio || 'NO BIOGRAPHICAL RECORD ON FILE',
        knownFor: habitat,
      },
    });

    if (!req.file) {
      return res.status(201).json(newHuman);
    }

    const photoData = await uploadPhotoToStorage(
      req.file,
      `humans/${newHuman.id}`,
      'profile',
    );

    const updatedHuman = await prisma.human.update({
      where: { id: newHuman.id },
      data: photoData,
    });

    res.status(201).json(updatedHuman);
  } catch (error) {
    if (newHuman?.id) {
      await prisma.human.delete({ where: { id: newHuman.id } }).catch(() => {});
    }

    console.error('Error creating human:', error);
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
app.post('/api/humans/:id/reviews', upload.single('photo'), async (req, res) => {
  const { id } = req.params;
  const { applianceName, applianceType, rating, title, body, mood } = req.body;
  let newReview;

  try {
    newReview = await prisma.review.create({
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

    if (!req.file) {
      return res.status(201).json(newReview);
    }

    const photoData = await uploadPhotoToStorage(
      req.file,
      `reviews/${newReview.id}`,
      'incident',
    );

    const updatedReview = await prisma.review.update({
      where: { id: newReview.id },
      data: photoData,
    });

    res.status(201).json(updatedReview);
  } catch (error) {
    if (newReview?.id) {
      await prisma.review.delete({ where: { id: newReview.id } }).catch(() => {});
    }

    console.error('Error creating review:', error);
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

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Image upload must be 5MB or smaller' });
    }

    return res.status(400).json({ error: err.message });
  }

  if (err?.message === 'Only jpeg, png, and webp images are allowed') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
