import connectDB from "../common/connectiondb";
import {Enterprise} from "../entity/Enterprise.entity";

export class EnterpriseService{
    public static findAll = async () => {
        await connectDB.initialize();
        return Enterprise.find();
    }
}