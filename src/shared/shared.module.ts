import { Global, Module } from '@nestjs/common'

import { ConfigModule } from './modules/config/config.module'

@Global()
@Module({
    imports: [ConfigModule],
    exports: [ConfigModule],
})
export class SharedModule {}
