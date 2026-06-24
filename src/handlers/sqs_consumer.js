const { SFNClient, StartExecutionCommand } = require("@aws-sdk/client-sfn");
const sfnClient = new SFNClient({});

exports.handler = async (event) => {
    console.log("Received SQS Records:", event.Records.length);

    for (const record of event.Records) {
        const payload = JSON.parse(record.body);

        const params = {
            stateMachineArn: process.env.STATE_MACHINE_ARN,
            input: JSON.stringify(payload),
            name: `Order-${payload.orderId}-${Date.now()}` // Unique execution name
        };

        try {
            const command = new StartExecutionCommand(params);
            await sfnClient.send(command);
            console.log(`Started Step Function execution for order ${payload.orderId}`);
        } catch (error) {
            console.error("Failed to start execution:", error);
            throw error; // Throwing ensures SQS doesn't delete the message if this fails
        }
    }
};
