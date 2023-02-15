import {APIGatewayProxyHandler} from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {

    return {
        statusCode: 203,
        body: JSON.stringify({query: event.queryStringParameters})
    }
}