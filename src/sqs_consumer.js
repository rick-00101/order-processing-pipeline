const { SFNClient, StartExecutionCommand } = require('@aws-sdk/client-sfn');

// Initialize the Step Functions Client
const sfnClient = new SFNClient();

exports.handler = async (event) => {
    console.log("SQS Event received:", JSON.stringify(event, null, 2));

    for (const record of event.Records) {
        // The message body is the JSON order payload we sent from curl
        const orderData = record.body;
        
        const params = {
            stateMachineArn: process.env.STATE_MACHINE_ARN, // Pulled from template.yaml
            input: orderData // Pass the order data into Step Functions
        };

        try {
            console.log(`Starting Step Functions execution for message: ${record.messageId}`);
            const command = new StartExecutionCommand(params);
            const response = await sfnClient.send(command);
            console.log(`Execution started successfully! Execution ARN: ${response.executionArn}`);
        } catch (error) {
            console.error(`Failed to start execution:`, error);
            throw error; // Force Lambda to fail so SQS retries the message
        }
    }
    
    return { statusCode: 200, body: 'Successfully processed SQS messages.' };
};