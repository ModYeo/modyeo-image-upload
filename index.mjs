import AWS from 'aws-sdk';
import process from 'process';

// AWS 구성
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION
});

const s3 = new AWS.S3();

export const handler = async (event) => {
  const base64Image = event.imageData;
  const key = event.resource

  // Base64 디코딩
  const imageBuffer = Buffer.from(base64Image, 'base64');

  try {
    // S3 업로드 설정
    const params = {
      Bucket: 'modyeo-image',
      Key: key, // 업로드 될 파일의 경로와 이름
      Body: imageBuffer,
      ContentType: 'image/jpeg' // 이미지 파일의 MIME 유형에 맞게 변경
    };

    // S3로 파일 업로드
    const uploadResult = await s3.upload(params).promise();
    console.log('File uploaded successfully:', uploadResult.Location);

    return {
      statusCode: 200,
      body: { url: uploadResult.Location }
    };
  } catch (err) {
    console.error('Error reading or uploading file:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload file' })
    };
  }
};