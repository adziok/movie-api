import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { SharedModule } from '@shared/shared.module';
import { ConfigModule } from '@shared/modules/config/config.module';
import { ConfigService } from '@shared/modules/config/config.service';
import { MoviesModule } from '@modules/movies/movies.module';

@Module({
    imports: [
        ConfigModule,
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.mongoConnectionString,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }),
            inject: [ConfigService],
        }),
        SharedModule,
        MoviesModule
    ],
    controllers: [CoreController],
    providers: [CoreService],
})
export class CoreModule {}
