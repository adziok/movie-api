import { MockType } from "@shared/utils/specs.utils";

export const mockOmdbapiServiceFactory: () => MockType<any> = jest.fn(() => ({
    search: jest.fn(),
}))
