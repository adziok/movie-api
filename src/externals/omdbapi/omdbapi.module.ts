import { Module } from '@nestjs/common'

import { OmdbapiService } from './omdbapi.service'

@Module({
    providers: [OmdbapiService],
    exports: [OmdbapiService],
})
export class OmdbapiModule {}
