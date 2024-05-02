export const handler = async (_event, _context) => {
    console.log("Hello, Lambda 2!");
    // TODO:
    // API Gateway event input validation
    // Save to Dynamo
    // Send to SQS
    // Return 204
    return {
        statusCode: 200,
    };
};
//# sourceMappingURL=post-frame.js.map