import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { CoreModule } from '@core/core.module';
import { ConfigService } from '@shared/modules/config/config.service'
import { RestGuard } from '@shared/guards/rest.guard'

async function bootstrap() {
    const app = await NestFactory.create(CoreModule)

    const config: ConfigService = app.get(ConfigService)

    app.useGlobalPipes(new ValidationPipe({ transform: true }))

    app.useGlobalGuards(new RestGuard(config))

    await app.listen(config.port)
}

bootstrap()
