// @ts-ignore

export const repositoryMockFactory: () => MockType<any> = jest.fn(() => ({
    find: jest.fn(),
    create: jest.fn(),
}));

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
};
