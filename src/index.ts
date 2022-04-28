export async function handler(event: string, context: string) {
    console.log('Stage Name is: ' + process.env.stage);
    return {
        body: 'Hello from a Lambda Function 👋',
        statusCode: 200,
    };
}