import { Request, Response } from 'express';
import * as ImageService from '../services';

export const handleImageUpload = async (req: Request, res: Response) => {
  const { originalUrl, restoredUrl } = req.body;

  try {
    const image = await ImageService.storeImage(originalUrl, restoredUrl);
    res.status(201).json({
      message: 'Image stored successfully',
      data: image,
    });
  } catch (error) {
    console.error('Error in image controller:', error);
    res.status(500).json({ error: 'Failed to store image' });
  }
};
