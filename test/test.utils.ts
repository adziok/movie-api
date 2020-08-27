import * as mongoose from 'mongoose'
// import { mongoose } from '@typegoose/typegoose'

export const drooDatabase = mongoConnectionUri =>
    mongoose
        .connect(mongoConnectionUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async ({ connection }) => {
            await connection.db.dropDatabase()
            connection.close()
        })
