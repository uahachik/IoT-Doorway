import { S3Event } from 'aws-lambda';

export const handler = async (event: S3Event) => {
  console.log('Log MQTT message', event);

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from MQTT!'),
  };
  return response;
};