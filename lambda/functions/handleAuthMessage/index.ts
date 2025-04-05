import { S3Event } from 'aws-lambda';

export const handler = async (event: S3Event) => {
  console.log('Test this event in the mjs', event);

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from mjs!'),
  };
  return response;
};