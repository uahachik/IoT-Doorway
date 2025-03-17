import { mqtt } from 'aws-iot-device-sdk-v2';
import { createMqttConnection } from './createMqttConnection';

export default async function publicToTopic({ topic, message }: PubSubArgv) {
  const count = 5;

  return new Promise<void>(async (resolve, reject) => {
    try {
      let published = false;
      let subscribed = false;
      const decoder = new TextDecoder('utf8');

      const on_publish = async (topic: string, payload: ArrayBuffer, dup: boolean, qos: mqtt.QoS, retain: boolean) => {
        const json = decoder.decode(payload);
        console.log(`🟣 Publish received. topic:"${topic}" dup:${dup} qos:${qos} retain:${retain}`);
        console.log(`📩 Publisher's payload: ${json}`);
        try {
          const parsedPayload = JSON.parse(json);
          if (parsedPayload.sequence == count) {
            subscribed = true;
            if (subscribed && published) {
              resolve();
            }
          }
        }
        catch (error) {
          console.log('Warning: Could not parse message as JSON...');
        }
      };

      const connection = await createMqttConnection();

      await connection.subscribe(topic, mqtt.QoS.AtLeastOnce, on_publish);
      let published_counts = 0;
      for (let op_idx = 0; op_idx < count; ++op_idx) {
        const publish = async () => {
          const msg = {
            message: message,
            sequence: op_idx + 1,
          };
          const json = JSON.stringify(msg);
          connection.publish(topic, json, mqtt.QoS.AtLeastOnce).then(() => {
            ++published_counts;
            if (published_counts == count) {
              published = true;
              if (subscribed && published) {
                resolve();
              }
            }
          });
        };
        setTimeout(publish, op_idx * 1000);
      }
    }
    catch (error) {
      reject(error);
    }
  });
}