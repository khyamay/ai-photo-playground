import { prisma } from '@ai-photo-playground/database';
import { PredictionResponse } from '../types';

const MAX_POLLING_ATTEMPTS = 30;
const POLLING_INTERVAL = 2000;

// export const restoreImage = async (
//   imageUrl: string
// ): Promise<{ restoredUrl: string; id: number }> => {

//   const response = await fetch('https://api.replicate.com/v1/predictions', {
//     method: 'POST',
//     headers: {
//       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       version:
//         '9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3',
//       input: { img: imageUrl },
//     }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to call Replicate API');
//   }

//   const replicateResponse = await response.json();
//   const restoredUrl = replicateResponse.output;

//   const storedImage = await ImageService.storeImage(imageUrl, restoredUrl);

//   return { restoredUrl, id: +storedImage.id };
// };

const startPrediction = async (
  imageUrl: string
): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${process.env.REPLICATE_API_URL}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version:
          '0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c',
        input: { img: imageUrl },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error starting prediction: ${response.statusText}`);
    }

    return <PredictionResponse>await response.json();
  } catch (error) {
    console.error(`Error starting prediction: ${error.message}`);
    throw new Error('Failed to start image restoration process');
  }
};

const pollForResult = async (getUrl: string): Promise<string> => {
  for (let attempt = 0; attempt < MAX_POLLING_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(getUrl, {
        headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
      });

      if (!response.ok) {
        throw new Error(`Error polling for result: ${response.statusText}`);
      }

      const data = <PredictionResponse>await response.json();
      const { status, output } = data;

      if (status === 'succeeded' && output) {
        return output;
      }

      if (status === 'failed') {
        throw new Error('Image restoration failed');
      }

      // If not succeeded or failed, wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
    } catch (error) {
      console.error(`Error polling for result: ${error.message}`);
      throw new Error('Failed to get restoration result');
    }
  }

  throw new Error('Timeout: Image restoration took too long');
};

const storeImageInDB = async (
  originalUrl: string,
  restoredUrl: string
): Promise<any> => {
  try {
    const storedImage = await prisma.image.create({
      data: {
        originalUrl,
        restoredUrl,
        status: 'COMPLETED',
      },
    });

    return storedImage;
  } catch (error) {
    console.error('Error storing image in database:', error);
    throw new Error('Failed to store image in database');
  }
};

export const restoreImage = async (imageUrl: string) => {
  try {
    const initialResponse = await startPrediction(imageUrl);
    const restoredUrl = await pollForResult(initialResponse.urls.get);
    const storedImage = await storeImageInDB(imageUrl, restoredUrl);
    return restoredUrl;
  } catch (error) {
    console.error(`Error restoring image: ${error.message}`);
    throw new Error('Failed to restore image');
  }
};
