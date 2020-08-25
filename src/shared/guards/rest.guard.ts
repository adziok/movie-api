import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'

import { ConfigService } from './../modules/config/config.service'

@Injectable()
export class RestGuard implements CanActivate {
    constructor(private config: ConfigService) {}

    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromRequest(request)

        return this.validateToken(token)
    }

    private extractTokenFromRequest(req: Request): string {
        return (
            req.headers?.authorization?.replace('Bearer ', '') ||
            (req.query as any)?.access_token?.replace('Bearer ', '')
        )
    }

    private validateToken(token: string): boolean {
        return this.config.restSecret === String(token)
    }
}
