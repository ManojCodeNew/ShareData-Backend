# ShareData Backend

A Node.js backend API for sharing messages and files with temporary access tokens.

## Features

- 📝 Save text messages with unique tokens
- 📁 Upload files to AWS S3
- 🔍 Retrieve messages and files using tokens
- 🔒 Secure file storage with AWS S3
- 🚀 Built with Express.js and MongoDB

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **AWS S3** - File storage
- **Multer** - File upload handling
- **AWS SDK v3** - AWS services integration

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_BUCKET_NAME=your_s3_bucket_name
   PORT=5000
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### POST /api/message
Upload a message with optional file attachment.

**Request:**
- `message` (string, optional) - Text message
- `file` (file, optional) - File attachment

**Response:**
```json
{
  "message": "Message saved successfully",
  "token": 1234
}
```

### GET /api/message/:token
Retrieve a message and file URL by token.

**Response:**
```json
{
  "message": "Your message text",
  "fileUrl": "https://bucket.s3.region.amazonaws.com/file.jpg"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `AWS_ACCESS_KEY` | AWS access key ID |
| `AWS_SECRET_ACCESS_KEY` | AWS secret access key |
| `AWS_REGION` | AWS region (e.g., us-east-1) |
| `AWS_BUCKET_NAME` | S3 bucket name |
| `PORT` | Server port (default: 5000) |

## File Structure

```
Backend/
├── models/
│   └── Message.js          # MongoDB message schema
├── utils/
│   └── uploadToS3.js       # S3 upload utility
├── Server.js               # Main server file
├── package.json            # Dependencies and scripts
└── .env                    # Environment variables
```

## License

ISC