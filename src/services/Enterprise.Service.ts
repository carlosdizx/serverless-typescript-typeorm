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

    public static findByDocumentTypeAndDocumentNumber = async (
        documentType: string,
        documentNumber: string,
    ) => {
        await getConnect();
        const query = Enterprise
            .createQueryBuilder('enterprise')
            .where('enterprise.documentType = :documentType', { documentType });
        if (documentType === 'NIT') {
            const data = documentNumber.split('-');
            query.andWhere('enterprise.documentNumber = :documentNumber', {documentNumber: data[0]});
            query.andWhere('enterprise.verifier = :verifier', {verifier: data[1]});
        }else{
            query.andWhere('enterprise.documentNumber = :documentNumber', { documentNumber });
        }
        const enterprise = await query.getOne();
        if(!enterprise) throw new Error(`Not found enterprise`);
        return query.getOne();
    };

    public static updateEnterprise = async (documentType: string, documentNumber: string, data: EnterpriseDto) => {
        await getConnect();
        const enterprise = EnterpriseService.findByDocumentTypeAndDocumentNumber(documentType,documentNumber);
    }
}