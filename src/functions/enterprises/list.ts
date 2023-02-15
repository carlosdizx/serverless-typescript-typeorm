import {APIGatewayProxyHandler} from "aws-lambda";
import {Enterprise} from "../../entity/Enterprise.entity";
import connectDB from "../../common/connectiondb";

export const handler: APIGatewayProxyHandler = async (event) => {
    await connectDB.initialize();

    const enterprises = await Enterprise.find();

    return {
        statusCode: 200,
        body: JSON.stringify(enterprises)
    }
}