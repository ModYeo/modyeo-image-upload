import AWS from 'aws-sdk';
const s3 = new AWS.S3();

export const handler = async(event) => {

    // 예제 사용
    uploadObject('my-bucket', 'example.txt', './example.txt');

    
    // TODO implement
    
};

const uploadObject = async (bucketName, key, filePath) => {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: require('fs').createReadStream(filePath),
    };
  
    try {
      const result = await s3.upload(params).promise();
      const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
    } catch (error) {
        const response = {
        statusCode: 500,
        body: JSON.stringify('Error uploading object:', error),
    };
    return response;
      console.error('Error uploading object:', error);
    }
  };