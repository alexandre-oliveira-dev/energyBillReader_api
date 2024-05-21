import aws from 'aws-sdk'
import dotenv from 'dotenv';

dotenv.config();


export const s3 = new aws.S3();

