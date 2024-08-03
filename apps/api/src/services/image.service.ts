import { prisma } from '@ai-photo-playground/database';

export const storeImage = async (originalUrl: string, restoredUrl?: string) => {
  try {
    return await prisma.image.create({
      data: {
        originalUrl,
        restoredUrl: restoredUrl || null,
      },
    });
  } catch (error) {
    console.error('Error storing image:', error);
    throw new Error('Failed to store image');
  }
};
