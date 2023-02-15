import {APIGatewayProxyHandler} from "aws-lambda";
import {EnterpriseService} from "../../services/Enterprise.Service";

export const handler: APIGatewayProxyHandler = async (event) => {
    const result = await EnterpriseService.findAll();
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}