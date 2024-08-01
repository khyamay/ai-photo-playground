export const processUploadedPhoto = async (
  file: Express.Multer.File
): Promise<any> => {
  if (!file) {
    throw new Error('No file provided');
  }

  // File details
  const fileDetails = {
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    buffer: file.buffer.toString('base64'), // Convert buffer to base64 for demonstration
  };

  return {
    message: 'File processed successfully',
    file: fileDetails,
  };
};
