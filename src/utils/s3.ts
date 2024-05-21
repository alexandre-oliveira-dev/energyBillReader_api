import aws from 'aws-sdk'


aws.config.update({
  accessKeyId: "AKIA47CRU3AYXCXPGWOX",
  secretAccessKey: "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",
  region: 'us-east-1'
})

export const s3 = new aws.S3();

export const generatePreSignedUrl = async (
  type = '', //'putObject' || 'getObject'
  params = {}
) => {
  return await s3.getSignedUrl(type, params);
}