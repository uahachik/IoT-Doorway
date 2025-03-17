import { config } from 'dotenv';
config({ path: '../.env' });
import { mqtt, iot } from 'aws-iot-device-sdk-v2';
import { v4 as uuidv4 } from 'uuid';

export async function createMqttConnection() {
  try {
    const certificate = process.env.AWS_IOT_CERTIFICATE!;
    const privateKey = process.env.AWS_IOT_PRIVATE_KEY!;
    const endpoint = process.env.AWS_ENDPOINT!;
    const clientId = `myDevice-${uuidv4()}`;

    const mqttClient = new mqtt.MqttClient();

    const configBuilder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder(
      certificate,
      privateKey,
    );
    configBuilder.with_endpoint(endpoint);
    configBuilder.with_client_id(clientId);

    const connection = mqttClient.new_connection(configBuilder.build());

    // Connect to AWS IoT Core
    await connection.connect();
    console.log('✅ Connected to AWS IoT Core, and Client ID:', clientId);

    return connection;
  } catch (error) {
    throw new Error(`❌ MQTT connection failed: ${error}`);
  }
}