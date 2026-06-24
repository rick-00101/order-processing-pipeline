exports.handler = async (event) => {
    console.log("Processing payment for:", JSON.stringify(event));

    // Phase 4: Fault injection for testing retries
    if (event.force_payment_failure) {
        throw new Error("CustomPaymentFailure: Insufficient funds or gateway timeout.");
    }

    return {
        status: "SUCCESS",
        transactionId: `TXN-${Math.floor(Math.random() * 100000)}`,
        amountProcessed: event.amount
    };
};
