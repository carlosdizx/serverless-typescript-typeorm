import { DataSource } from "typeorm";
import {Enterprise} from "../entity/Enterprise.entity";

const dataSource =  new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pop_dev",
    entities: [Enterprise]
})

const getConnect = async () => {
    if(!dataSource.isInitialized) await  dataSource.initialize();
}

export default getConnect;