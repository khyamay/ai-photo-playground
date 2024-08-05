# AI Photo Restoration Project

## Overview

This project is an AI-powered photo restoration application that allows users to upload old or damaged photos and receive restored versions.

## Features

- Upload and restore old or damaged photos
- AI-powered image enhancement and restoration
- Download restored images

## Tech Stack

- **Frontend**: Angular with TypeScript
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI Model**: Replicate API (GFPGAN model)
- **Image Storage**: Cloudinary
- **Containerization**: Docker

## High-Level Architecture

```plaintext
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Angular   │     │  Express.js │     │  PostgreSQL │
│  Frontend   │◄───►│   Backend   │◄───►│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
      ▲                   ▲                   ▲
      │                   │                   │
      │                   │                   │
      │            ┌──────▼───────┐    ┌──────▼───────┐
      │            │  Replicate   │    │   Prisma     │
      │            │  AI API      │    │     ORM      │
      │            └──────────────┘    └──────────────┘
      │
      │
┌──────▼───────┐
│  Cloudinary  │
│  Storage     │
└──────────────
```

## Upcoming Features

1. **Authentication and Authorization**

   - Implement user accounts and login functionality
   - Secure API endpoints with JWT authentication

2. **Image History**

   - Allow users to view their previously restored images

3. **Image Management**

   - Add the ability for users to delete their old restored images

4. **Enhanced AI Options**

   - Provide users with multiple AI model choices for restoration
   - Allow customization of restoration parameters

5. **Batch Processing**
   - Enable users to upload and restore multiple images at once

## Getting Started

Todo

## Contributing

Todo
