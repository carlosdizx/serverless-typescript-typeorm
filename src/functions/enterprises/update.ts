import {APIGatewayProxyHandler} from "aws-lambda";
import {EnterpriseService} from "../../services/Enterprise.Service";
import EnterpriseDto from "../../dto/enterprise.dto";

export const handler: APIGatewayProxyHandler = async (event) => {
    const {documentType, documentNumber} = event.queryStringParameters as any;
    let data: EnterpriseDto;
    if (typeof event.body === "string") {
        data = JSON.parse(event.body) as EnterpriseDto;
    } else throw new Error("alv")
    const result = await EnterpriseService.updateEnterprise(documentType,documentNumber, data);
    console.log(result);
    return {
        statusCode: 204,
        body: JSON.stringify(result)
    }
}