exports.handler = async (event) => {
    console.log("Verifying inventory for:", JSON.stringify(event));

    // Mock inventory logic
    const items = event.items || [];
    if (items.length === 0) {
        throw new Error("InvalidOrder: No items in cart.");
    }

    return {
        status: "RESERVED",
        itemsProcessed: items.length
    };
};
