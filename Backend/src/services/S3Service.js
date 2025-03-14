const { Upload } = require('@aws-sdk/lib-storage');
const { v4: uuidv4 } = require('uuid');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

class S3Service {
    static s3Client;

    static getInstance() {
        if (!S3Service.s3Client) {
            S3Service.s3Client = new S3Client({
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
                }
            });
        }
        return S3Service.s3Client;
    }

    // Subir el buffer a S3
    static async uploadBuffer(buffer, contentType, folder = "uploads") {
        const bucketName = process.env.AWS_BUCKET_NAME;

        // Realizar el upload a S3 con el buffer
        const upload = new Upload({
            client: S3Service.getInstance(),
            params: {
                Bucket: bucketName,
                Key: `${folder}/${uuidv4()}`,
                Body: buffer,  // Usar el buffer directamente
                ContentType: contentType
            }
        });

        // Realizar el upload
        const result = await upload.done();
        if (!result.Location) throw new Error('Error uploading image');

        return [result.Location, null];
    }

    static async deleteImage(imageUrl) {
        const bucketName = process.env.AWS_BUCKET_NAME;
        if (!imageUrl) throw new Error('imageUrl is undefined or null');

        try {
            const key = imageUrl.split('.com/')[1];
            if (!key) throw new Error('Invalid S3 image URL. Could not extract key.');

            const command = new DeleteObjectCommand({ Bucket: bucketName, Key: key });
            await S3Service.getInstance().send(command);
            return { message: 'Image deleted successfully' };
        } catch (err) {
            throw new Error('Error deleting image from S3');
        }
    }
}

module.exports = S3Service;
