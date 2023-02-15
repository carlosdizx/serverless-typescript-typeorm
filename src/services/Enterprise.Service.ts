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

    public static findByDocumentNumber = async (
        documentNumber: string,
        verifier?: string,
    ) => {
        await getConnect();
        const query = Enterprise
            .createQueryBuilder('enterprise')
            .where('enterprise.documentNumber = :documentNumber', { documentNumber });
        if (verifier)
            query.andWhere('enterprise.verifier = :verifier', { verifier });
        return query.getOne();
    };

    public static updateEnterprise = async (
        enterpriseDto: EnterpriseDto,
        documentNumber: string,
        verifier?: string,
    ) => {
        await getConnect();
        const enterprise = await EnterpriseService.findByDocumentNumber(
            documentNumber,
            verifier,
        );
        const isNit = enterpriseDto.documentType === 'NIT';
        if (!enterprise)
            throw new Error(
                `Enterprise with document number ${
                    isNit ? documentNumber.concat(`-${verifier}`) : documentNumber
                }`,
            );
        enterprise.name = enterpriseDto.name;
        enterprise.documentType = enterpriseDto.documentType;
        enterprise.documentNumber = isNit
            ? enterpriseDto.documentNumber.split('-')[0]
            : enterpriseDto.documentNumber;
        enterprise.verifier = isNit
            ? enterpriseDto.documentNumber.split('-')[1]
            : "";
        return enterprise.save();
    };
}