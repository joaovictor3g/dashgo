import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
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
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header, Pagination, Sidebar } from "@/components";
import { useUsers } from "@/services";

export default function UserList() {
  const { data: users, isLoading, error, isFetching } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td px={["4", "4", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold">{user.name}</Text>
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
      <Pagination />
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
            <Link href="/users/create" passHref>
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
            </Link>
          </Flex>

          {isLoading ? <Loading /> : error ? <Error /> : <Success />}
        </Box>
      </Flex>
    </Box>
  );
}
