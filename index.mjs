import AWS from 'aws-sdk';
const s3 = new AWS.S3();

// AWS 구성
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRETACCESS_KEY,
  region: process.env.REGION
});

export const handler = async (event) => {

  console.log(event)

  const base64Image = event.imagedata;
  const key = event.resouce

  // Base64 디코딩
  const imageBuffer = Buffer.from(base64Image, 'base64');
  console.log("디코딩 잘됬어요");

  try {
    // S3 업로드 설정
    const params = {
      Bucket: 'modyeo-image',
      Key: key, // 업로드 될 파일의 경로와 이름
      Body: imageBuffer,
      ContentType: 'image/jpeg' // 이미지 파일의 MIME 유형에 맞게 변경
    };
    console.log("파라미터 잘됬어요");

    // S3로 파일 업로드
    const uploadResult = await s3.upload(params).promise();
    console.log('File uploaded successfully:', uploadResult.Location);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: uploadResult.Location })
    };
  } catch (err) {
    console.error('Error reading or uploading file:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to upload file' })
    };
  }
};