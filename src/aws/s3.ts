require("dotenv/config");
import aws from 'aws-sdk'


aws.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1'
})

export const s3 = new aws.S3();

