import { mqtt } from 'aws-iot-device-sdk-v2';
import { createMqttConnection } from './createMqttConnection';

export default async function subscribeToTopic({ topic }: PubSubArgv) {
  const connection = await createMqttConnection();

  try {
    await connection.subscribe(topic, mqtt.QoS.AtLeastOnce, (topic, payload) => {
      const message = Buffer.from(payload).toString('utf-8');
      console.log(`🟡 Message received on topic "${topic}": ${message}`);
    });
    console.log(`🔄 Successfully subscribed to topic: ${topic}`);
  } catch (err: any) {
    console.error(`❌ Failed to subscribe: ${err.message}`);
  }
}

