import S3 from "aws-sdk/clients/s3";
const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const bucket_name = process.env.AWS_BUCKET_NAME;


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
});
//upload file to S3

export async function upload(file: any) {
  const fileStream = fs.readFileSync(file.path);
  const uploadParams = {
    Bucket: bucket_name,
    Body: fileStream,
    Key: file.filename,
  };
  return await s3.upload(uploadParams).promise();
}

//download file form s3

export async function getImageFromS3(fileKey:any){
  const downloadParams={
    Key: fileKey,
    Bucket:bucket_name,
  } 
   return s3.getObject(downloadParams).createReadStream();

}