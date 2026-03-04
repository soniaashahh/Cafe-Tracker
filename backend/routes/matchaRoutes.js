import express from 'express';
import { MatchaSpot } from '../models/matchaModel.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// CREATE
router.post('/', async (req, res) => {
  try {
    const { name, location, signatureDrink, rating } = req.body;
    if (!name || !location || !signatureDrink || rating == null) {
      return res.status(400).send({
        message: 'Send all required fields: name, location, signatureDrink, rating (1–5)',
      });
    }
    const spot = await MatchaSpot.create({
      name,
      location,
      signatureDrink,
      rating: Number(rating),
      userId: req.user._id,
    });
    return res.status(201).send(spot);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// READ ALL (only user's spots)
router.get('/', async (req, res) => {
  try {
    const spots = await MatchaSpot.find({ userId: req.user._id });
    res.status(200).json({ count: spots.length, data: spots });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// READ ONE (only if belongs to user)
router.get('/:id', async (req, res) => {
  try {
    const spot = await MatchaSpot.findOne({ _id: req.params.id, userId: req.user._id });
    if (!spot) {
      return res.status(404).json({ message: 'Spot not found' });
    }
    res.status(200).json(spot);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// UPDATE (only if belongs to user)
router.put('/:id', async (req, res) => {
  try {
    const { name, location, signatureDrink, rating } = req.body;
    if (!name || !location || !signatureDrink || rating == null) {
      return res.status(400).send({
        message: 'Send all required fields: name, location, signatureDrink, rating (1–5)',
      });
    }
    const updated = await MatchaSpot.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, location, signatureDrink, rating: Number(rating) },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Spot not found' });
    res.status(200).send({ message: 'Spot updated successfully', spot: updated });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// DELETE (only if belongs to user)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MatchaSpot.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ message: 'Spot not found' });
    res.status(200).send({ message: 'Spot deleted successfully' });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

export default router;
