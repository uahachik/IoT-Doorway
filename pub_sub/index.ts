import yargs from 'yargs';
// import publishToTopic from './src/mqttPublisher';
// import subscribeToTopic from './src/mqttSubscriber';
import authMessage from './src/messanger/auth';

yargs.command(
    '*',
    false,
    () => {
        yargs.default('topic', 'sdk/test/pub_sub');
        yargs.default('message', 'Cheers from AWS IoT MQTT Broker');
    },
    (argv: PubSubArgv) => main(argv))
    .parse();

async function main(argv: PubSubArgv) {
    await authMessage(argv);
    // await subscribeToTopic(argv);
    // await publishToTopic(argv);
}