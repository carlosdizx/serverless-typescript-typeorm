import { DataSource } from "typeorm";
import {Enterprise} from "../entity/Enterprise.entity";
import dotenv = require("dotenv");
dotenv.config();

const dataSource =  new DataSource({
    type: 'postgres',
    host: process.env.DB_POSTGRES_HOST || 'localhost',
    port: parseInt(`${process.env.DB_POSTGRES_PORT}`) || 5432,
    username: process.env.DB_POSTGRES_USER || 'postgres',
    password: process.env.DB_POSTGRES_PASSWORD || 'postgres',
    database: process.env.DB_POSTGRES_DATABASE || 'pop_dev',
    entities: [Enterprise]
})

const getConnect = async () => {
    console.log(process.env.DB_POSTGRES_USER, ">=================<");
    if(!dataSource.isInitialized) await  dataSource.initialize();
}

export default getConnect;