// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const config = {
    name: 'Comments',
    nameToLowerCase: 'comments',
    schema: 'Comment',
    schemaLowerCase: 'comment'
};

const startWithLowerCase = (t) => t[0].toLowerCase()+t.slice(1,Infinity)

const moduleWithModel = `import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ${config.name}Controller } from './${config.nameToLowerCase}.controller';
import { ${config.name}Service } from './${config.nameToLowerCase}.service';
import { ${config.schema} } from './model/${config.schemaLowerCase}.model';
import { ${config.schema}Repository } from './model/${config.schemaLowerCase}.repository';

@Module({
    imports: [
        TypegooseModule.forFeature([${config.schema}]),
    ],
    controllers: [${config.name}Controller],
    providers: [${config.name}Service, ${config.schema}Repository],
    exports: [${config.name}Service],
})
export class ${config.name}Module {}
`;

const defaultSchema = `import { prop } from '@typegoose/typegoose';

import { BaseDBOBject } from '@shared/classes/base-db-model';

export class ${config.schema} extends BaseDBOBject {
    @prop()
    test: string;
}
`

const defaultRepository = `import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from "@typegoose/typegoose";

import { ${config.schema} } from './${config.schemaLowerCase}.model';

const logger = new Logger('${config.schema}Repository');

@Injectable()
export class ${config.schema}Repository {
    constructor(@InjectModel(${config.schema}) private readonly ${startWithLowerCase(config.schema)}Model: ReturnModelType<typeof ${config.schema}>) { }
}
`;

const defaultService = `import { Injectable } from '@nestjs/common';

import { ${config.schema}Repository } from './model/${config.schemaLowerCase}.repository';

@Injectable()
export class ${config.name}Service {
    constructor(private ${startWithLowerCase(config.schema)}Repository: ${config.schema}Repository) {}

}
`;

const defaultController = `import { Controller, Get } from '@nestjs/common';

import { ${config.name}Service } from './${config.nameToLowerCase}.service';

@Controller('/${config.name.toLowerCase()}')
export class ${config.name}Controller {
    constructor(private readonly ${config.name.toLowerCase()}Service: ${config.name}Service) {}

    @Get()
    public ping() {
        return 'pong';
    }

}
`;

const defaultRepositoryFake = `/* eslint-disable @typescript-eslint/no-empty-function */

export class ${config.schema}RepositoryFake {
    public create(): void {};
}
`;

const defaultServiceSpec = `import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';

import { ${config.schema}Repository } from './../model/${config.schemaLowerCase}.repository';
import { ${config.name}Service } from './../${config.nameToLowerCase}.service';
import { ${config.schema}RepositoryFake } from './${config.schemaLowerCase}.repository.fake';
import { ${config.schema} } from './../model/${config.schemaLowerCase}.model';

describe('${config.name}Service', () => {
    let ${config.nameToLowerCase}Service: ${config.name}Service;
    let ${config.schemaLowerCase}Repository: ${config.schema}Repository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ${config.name}Service,
                {
                    provide: ${config.schema}Repository,
                    useClass: ${config.schema}RepositoryFake,
                },
            ],
        }).compile();

        ${config.nameToLowerCase}Service = module.get(${config.name}Service);
        ${config.schemaLowerCase}Repository = module.get(${config.schema}Repository);
    });

    describe('Create ${config.schema}', () => {
        it('calls the service with correct paramaters', async () => {
            // const newRoundAnswer: RoundAnswer = {
            //     ...createRoundAnswerDto,
            //     createdAt: new Date(),
            //     updatedAt: new Date(),
            //     _id: Types.ObjectId()
            // };

            // const roundAnswerServiceCreatePlayerAnswer = jest
            //     .spyOn(roundAnswerService, 'createPlayerAnswer')
            //     .mockResolvedValue(newRoundAnswer);

            // const result = await roundAnswerService.createPlayerAnswer(createRoundAnswerDto);

            // expect(roundAnswerServiceCreatePlayerAnswer).toHaveBeenCalledWith(createRoundAnswerDto);

            // expect(result).toEqual(await newRoundAnswer);
        });
    });

});

`;


if(!fs.existsSync(`./src/modules/${config.nameToLowerCase}`)){
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}`, 0766);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/${config.nameToLowerCase}.module.ts`, moduleWithModel);
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}/model`, 0766);
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}/dto`, 0766);
    fs.mkdirSync(`./src/modules/${config.nameToLowerCase}/specs`, 0766);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/model/${config.schemaLowerCase}.model.ts`, defaultSchema);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/model/${config.schemaLowerCase}.repository.ts`, defaultRepository);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/${config.nameToLowerCase}.controller.ts`, defaultController);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/${config.nameToLowerCase}.service.ts`, defaultService);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/specs/${config.schemaLowerCase}.repository.fake.ts`, defaultRepositoryFake);
    fs.appendFileSync(`./src/modules/${config.nameToLowerCase}/specs/${config.schemaLowerCase}.service.spec.ts`, defaultServiceSpec);
}
