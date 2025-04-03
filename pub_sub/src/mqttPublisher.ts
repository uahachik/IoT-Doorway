import { mqtt } from 'aws-iot-device-sdk-v2';
import { createMqttConnection } from './createMqttConnection';

export default async function publicToTopic({ topic, message }: PubSubArgv) {
  const count = 5;

  return new Promise<void>(async (resolve, reject) => {
    try {
      const decoder = new TextDecoder('utf8');

      const on_publish = async (topic: string, payload: ArrayBuffer, dup: boolean, qos: mqtt.QoS, retain: boolean) => {
        const json = decoder.decode(payload);
        console.log(`🟣 on_publish Publish received. topic:"${topic}" dup:${dup} qos:${qos} retain:${retain}`);
        console.log(`📩 on_publishPublisher's payload: ${json}`);
        try {
          const parsedPayload = JSON.parse(json);
          console.log('parsedPayload', parsedPayload);
          if (parsedPayload.sequence == count) {
            console.log("🚀 on_publish Disconnecting...");
            await connection.disconnect();
            console.log("🎉 on_publish Successfully disconnected!");
            resolve();
          }
        }
        catch (error) {
          console.log('on_publish Warning: Could not parse message as JSON...');
        }
      };

      const connection = await createMqttConnection();
      connection.on('disconnect', () => {
        console.log("✅ Disconnected from AWS IoT");
      });
      await connection.subscribe(topic, mqtt.QoS.AtLeastOnce, on_publish);

      for (let op_idx = 0; op_idx < count; ++op_idx) {
        const publish = async () => {
          const msg = {
            message: message,
            sequence: op_idx + 1,
          };
          const json = JSON.stringify(msg);
          connection.publish(topic, json, mqtt.QoS.AtLeastOnce);
        };
        setTimeout(publish, op_idx * 1000);
      }
    }
    catch (error) {
      reject(error);
    }
  });
}