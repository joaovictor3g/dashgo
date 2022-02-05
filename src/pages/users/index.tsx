import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header, Pagination, Sidebar } from "@/components";
import { useUsers, queryClient, api, getUsers } from "@/services";
import { useState } from "react";
import { GetServerSideProps } from "next";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(page, {
    initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ["users", userId],
      async () => {
        const response = await api.get(`/users/${userId}`);

        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  const Loading = () => (
    <Flex justify="center">
      <Spinner />
    </Flex>
  );

  const Error = () => (
    <Flex justify="center">
      <Text>Falha ao obter dados do usuário!</Text>
    </Flex>
  );

  const Success = () => (
    <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]} color="gray.300" width="8">
              <Checkbox colorScheme="pink" />
            </Th>
            <Th>Usuário</Th>
            {isWideVersion && <Th>Data de cadastro</Th>}
            <Th width="8"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.users?.map((user) => (
            <Tr key={user.id}>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Link
                    color="purple.400"
                    onMouseEnter={() => handlePrefetchUser(Number(user.id))}
                  >
                    <Text fontWeight="bold">{user.name}</Text>
                  </Link>
                  <Text fontSize="small" color="gray.300">
                    {user.email}
                  </Text>
                </Box>
              </Td>
              {isWideVersion && <Th>{user.createdAt}</Th>}
              {isWideVersion && (
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="small"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                  >
                    {isWideVersion ? "Editar" : ""}
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        totalCountOfRegisters={data?.totalCount}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  );

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                color="whiteAlpha"
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? <Loading /> : error ? <Error /> : <Success />}
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { users } = await getUsers(1);

    return {
      props: {
        users,
      },
    };
  } catch (err) {
    return {
      props: {
        users: [],
      },
    };
  }
};
