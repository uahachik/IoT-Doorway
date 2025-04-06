import { mqtt } from 'aws-iot-device-sdk-v2';
import { createMqttConnection } from '../createMqttConnection';

export default async function authMessage({ topic, message }: PubSubArgv) {
  const connection = await createMqttConnection();
  connection.on('disconnect', () => {
    console.log("✅ publishMessage Disconnected from AWS IoT");
  });

  const json = JSON.stringify(message);
  console.log(`🔆 authMessage Connected to AWS IoT Core topic:"${topic}" and message:${json}`);

  await connection.publish(topic, json, mqtt.QoS.AtLeastOnce);
  console.log("📩 Message sent:", message);

  await connection.disconnect();
};