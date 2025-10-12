import express from 'express';
import { MatchaSpot } from '../models/matchaModel.js';

const router = express.Router();

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
    });
    return res.status(201).send(spot);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// READ ALL
router.get('/', async (_req, res) => {
  try {
    const spots = await MatchaSpot.find({});
    res.status(200).json({ count: spots.length, data: spots });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const spot = await MatchaSpot.findById(req.params.id);
    res.status(200).json(spot);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { name, location, signatureDrink, rating } = req.body;
    if (!name || !location || !signatureDrink || rating == null) {
      return res.status(400).send({
        message: 'Send all required fields: name, location, signatureDrink, rating (1–5)',
      });
    }
    const updated = await MatchaSpot.findByIdAndUpdate(
      req.params.id,
      { name, location, signatureDrink, rating: Number(rating) }
    );
    if (!updated) return res.status(404).json({ message: 'Spot not found' });
    res.status(200).send({ message: 'Spot updated successfully' });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MatchaSpot.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Spot not found' });
    res.status(200).send({ message: 'Spot deleted successfully' });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

export default router;
