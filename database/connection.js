import { Sequelize } from "sequelize";

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite'
});

const isReadyConnection = async () => {
    try {
        await connection.authenticate();
        return true
    } catch (error) {
        return false
    }
}

export { connection, isReadyConnection }