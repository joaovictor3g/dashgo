import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export function useUsers() {
  return useQuery<User[]>(
    "users",
    async () => {
      const response = await api.get("/users");
      const data = response.data;
      const users = data.users.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      }));

      return users;
    },
    {
      staleTime: 1000 * 5, // 5 seconds
    }
  );
}
