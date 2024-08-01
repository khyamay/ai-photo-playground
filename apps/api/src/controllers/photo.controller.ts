import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const handlePhotoUpload = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Path to a test image in your project
    const testImagePath = path.join(__dirname, 'assets', req.file.originalname);

    // Read the test image file
    const imageBuffer = fs.readFileSync(testImagePath);

    // Set the correct content type
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the image buffer
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error processing photo upload:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
