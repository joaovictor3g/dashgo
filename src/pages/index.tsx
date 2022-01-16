import type { NextPage } from "next";
import Head from "next/head";
import { Button, Flex, Stack } from "@chakra-ui/react";

import { Input } from "../components/Form";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dashgo | Inicio</title>
        <meta
          name="description"
          content="Dashgo - visualize modern dashboards"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Flex
          as="form"
          width="100%"
          maxW="360px"
          bg="gray.800"
          p="8"
          borderRadius="8"
          flexDir="column"
        >
          <Stack spacing={4}>
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Senha" />
          </Stack>

          <Button type="submit" mt="6" colorScheme="pink" size="lg">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
