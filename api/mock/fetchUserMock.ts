import { mockUsers } from "@/mocks/UsersMock"

export const fetchMockUsers = () => {
    return Promise.resolve(mockUsers);
}