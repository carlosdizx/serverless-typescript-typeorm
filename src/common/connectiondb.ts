import { DataSource } from "typeorm";
import {Enterprise} from "../entity/Enterprise.entity";

const connectDB =  new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "pop_dev",
    entities: [Enterprise]
})

connectDB
    .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default connectDB;