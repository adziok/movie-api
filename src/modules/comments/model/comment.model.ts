import { prop } from '@typegoose/typegoose'

import { BaseDBOBject } from '@shared/classes/base-db-model'

export class Comment extends BaseDBOBject {
    @prop({ required: true })
    content: string

    @prop({ required: true })
    owner: string
}
