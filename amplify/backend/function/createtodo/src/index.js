/* Amplify Params - DO NOT EDIT
	API_MYAPI_GRAPHQLAPIIDOUTPUT
	API_MYAPI_TODOTABLE_ARN
	API_MYAPI_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

async function createItem(params) {
    try {
        await docClient.put(params).promise();
    } catch (err) {
        return err;
    }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        await createItem({
            TableName: process.env.API_MYAPI_TODOTABLE_NAME,
            Item: {
                id: event.id,
                name: event.arguments.input.name,
                description: event.arguments.input.description,
                createdAt: event.createdAt,
                updatedAt: event.updatedAt,
                __typename: event.__typename
            }
        })
        return 'Successfully created item!' //event
    } catch (err) {
        return err
    }
};
