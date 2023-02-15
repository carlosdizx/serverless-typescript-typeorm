import {APIGatewayProxyHandler} from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    const {enterpriseId} = event.pathParameters as any;
    return {
        statusCode: 203,
        body: JSON.stringify({enterpriseId})
    }
}