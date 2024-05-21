import aws from 'aws-sdk'
import dotenv from 'dotenv';

dotenv.config();

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
})

export const s3 = new aws.S3();

