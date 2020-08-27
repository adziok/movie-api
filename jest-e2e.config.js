/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

module.exports = {
    testEnvironment: 'node',
    testTimeout: 15000,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: `${__dirname}/`,
    }),
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "./test",
    "testRegex": ".e2e-spec.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    }
};
