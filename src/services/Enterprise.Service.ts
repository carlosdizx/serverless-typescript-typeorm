import getConnect from "../common/connectiondb";
import {Enterprise} from "../entity/Enterprise.entity";
import EnterpriseDto from "../dto/enterprise.dto";

export class EnterpriseService{
    public static findAll = async () => {
        await getConnect();
        return Enterprise.find();
    }

    public static createEnterprise = async (data: EnterpriseDto) => {
        await getConnect();
        const enterprise = new Enterprise();
        enterprise.name = data.name;
        enterprise.documentType = data.documentType;
        const isNit = data.documentType === 'NIT';
        enterprise.documentNumber = isNit
            ? data.documentNumber.split('-')[0]
            : data.documentNumber;
        enterprise.verifier = isNit
            ? data.documentNumber.split('-')[1]
            : "";

        await enterprise.save()
        return enterprise;
    }
}