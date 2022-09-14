/* Amplify Params - DO NOT EDIT
	API_MYAPI_GRAPHQLAPIIDOUTPUT
	API_MYAPI_TODOTABLE_ARN
	API_MYAPI_TODOTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: process.env.API_MYAPI_TODOTABLE_NAME,
    ExpressionAttributeNames: {
        '#n': 'name'
    },
    ProjectionExpression: 'id,#n,description,createdAt,updatedAt'
}

async function listItems() {
    try {
        const data = await docClient.scan(params).promise()
        return data.Items
    } catch (err) {
        return err
    }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        const items = await listItems()
        return items
    } catch (err) {
        return { error: err }
    }
};
