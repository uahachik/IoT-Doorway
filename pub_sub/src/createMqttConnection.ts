import * as path from 'path';
import { mqtt, iot } from 'aws-iot-device-sdk-v2';
import { v4 as uuidv4 } from 'uuid';

const rootDir = path.resolve(__dirname, '../../');
const certPath = path.resolve(rootDir, 'TestUserMacBook.cert.pem');
const keyPath = path.resolve(rootDir, 'TestUserMacBook.private.key');

export async function createMqttConnection() {
  try {
    const endpoint = "a2bsnixthxysrf-ats.iot.us-east-1.amazonaws.com";
    const clientId = `myDevice-${uuidv4()}`;

    const mqttClient = new mqtt.MqttClient();

    const configBuilder = iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
      certPath,
      keyPath
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