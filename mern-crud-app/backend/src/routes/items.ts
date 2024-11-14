import express, { Request, Response } from 'express';
import Item, { IItem } from '../models/Item';

const router = express.Router();

// Create an item
router.post('/', async (req: Request, res: Response) => {
  try {
    const item = new Item(req.body as IItem);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Read all items
router.get('/', async (_req: Request, res: Response) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Update an item
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// Delete an item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default router;
