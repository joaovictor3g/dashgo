export { useUsers, getUsers } from "./hooks";
export { makeServer } from "./mirage";
import { setupApiClient } from "./api";
export { queryClient } from "./queryClient";
export { AuthTokenError } from "./errors/AuthTokenError";

export const api = setupApiClient();
export { setupApiClient } from "./api";
