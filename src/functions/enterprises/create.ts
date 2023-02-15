import {APIGatewayProxyHandler} from "aws-lambda";
import {EnterpriseService} from "../../services/Enterprise.Service";
import EnterpriseDto from "../../dto/enterprise.dto";

export const handler: APIGatewayProxyHandler = async (event) => {
    let data: EnterpriseDto;
    if (typeof event.body === "string") {
        data = JSON.parse(event.body) as EnterpriseDto;
    } else throw new Error("alv")
    const result = await EnterpriseService.createEnterprise(data);
    return {
        statusCode: 201,
        body: JSON.stringify(result)
    }
}