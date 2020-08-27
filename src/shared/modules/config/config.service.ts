import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as Joi from '@hapi/joi'

export interface EnvConfig {
    [key: string]: string
}

export class ConfigService {
    private envConfig: EnvConfig
    private envSchema: Joi.ObjectSchema = Joi.object({
        NODE_ENV: Joi.string().default('development'),
        PORT: Joi.number().default(4000),
        SECRET: Joi.string(),
    
        MONGO_HOST: Joi.string().default('mongodb://localhost'),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_DATABASE: Joi.string(),

        OMDBAPI_API_URL: Joi.string(),
        OMDBAPI_API_KEY: Joi.string(),
    })
    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath))
        this.envConfig = this.validateInput(config, this.envSchema)
        this.envConfig = config
    }

    get env(): string {
        return this.envConfig.NODE_ENV
    }

    get port(): number {
        return Number(this.envConfig.PORT)
    }

    get restSecret(): string {
        return this.envConfig.SECRET
    }

    get mongoConnectionString(): string {
        return `${this.envConfig.MONGO_HOST}:${this.envConfig.MONGO_PORT}/${this.envConfig.MONGO_DATABASE}`
    }

    get omdbapiApiUrl(): string {
        return this.envConfig.OMDBAPI_API_URL
    }

    get omdbapiApiKey(): string {
        return this.envConfig.OMDBAPI_API_KEY
    }

    private validateInput(envConfig: EnvConfig, envSchema): EnvConfig {
        const { error, value: validated } = envSchema.validate(envConfig)

        if (error) {
            throw new Error(`Config validation error: ${error.message}`)
        }

        return validated
    }
}
