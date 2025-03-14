import yargs, { Argv } from 'yargs';
import publishToTopic from './mqttPublisher';
import subscribeToTopicFunc from './mqttSubscriber';

yargs.command(
    '*',
    false,
    async (yargs: Argv) => {
        const common_args = await import('../util/cli_args.js');
        common_args.add_direct_connection_establishment_arguments(yargs);
        common_args.add_topic_message_arguments(yargs);

        // Set a default endpoint if not provided
        yargs.default('endpoint', 'a2bsnixthxysrf-ats.iot.us-east-1.amazonaws.com');
    },
    () => main())
    .parse();


// yargs.command('*', false, (yargs: any) => {
//     common_args.add_direct_connection_establishment_arguments(yargs);
//     common_args.add_topic_message_arguments(yargs);
// }, (argv: Args) => {
//     // ✅ Ensure `endpoint` has a default value
//     argv.endpoint = argv.endpoint || "a2bsnixthxysrf-ats.iot.us-east-1.amazonaws.com";

//     console.log('args', argv); // ✅ This will now log correctly

//     main(argv); // ✅ Now calling main with the updated argv
// })
//     // .exitProcess(false) // 👈 Prevents `yargs` from exiting early
//     .parse();

async function main() {
    // argv.endpoint = argv.endpoint || "a2bsnixthxysrf-ats.iot.us-east-1.amazonaws.com";

    // common_args.apply_sample_arguments(argv);

    // const connection = common_args.build_connection_from_cli_args(argv);

    // force node to wait 60 seconds before killing itself, promises do not keep node alive
    // ToDo: we can get rid of this but it requires a refactor of the native connection binding that includes
    //    pinning the libuv event loop while the connection is active or potentially active.
    // const timer = setInterval(() => { }, 60 * 1000);

    // const connection = await createMqttConnection();
    // await connection.connect();
    // console.log("✅ Connected to AWS IoT Core");

    await subscribeToTopicFunc();
    await publishToTopic();

    // await mqttPublisher(connection, argv);

    // await connection.disconnect();

    // Allow node to die if the promise above resolved
    // clearTimeout(timer);
}
