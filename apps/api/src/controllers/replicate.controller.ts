import { Request, Response } from 'express';
import * as ReplicateService from '../services/replicate.service';

export const handleRestoreImage = async (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  try {
    const result = await ReplicateService.restoreImage(imageUrl);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error restoring image:', error);
    res.status(500).json({ error: 'Failed to restore image' });
  }
};
