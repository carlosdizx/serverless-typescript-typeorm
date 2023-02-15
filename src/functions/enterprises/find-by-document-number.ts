import {APIGatewayProxyHandler} from "aws-lambda";
import {EnterpriseService} from "../../services/Enterprise.Service";

export const handler: APIGatewayProxyHandler = async (event) => {
    const {documentType, documentNumber} = event.queryStringParameters as any;
    const result = await EnterpriseService.findByDocumentTypeAndDocumentNumber(documentType, documentNumber)
    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}