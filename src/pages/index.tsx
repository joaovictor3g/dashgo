import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { parseCookies } from "nookies";

import { Form } from "@/components";
import { useAuth } from "@/contexts";
import { withSSRGuest } from "@/utils";

const { Input } = Form;

type SiginInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = object().shape({
  email: string().required("E-mail obrigatório").email("E-mail inválido"),
  password: string().required("Senha obrigatória"),
});

const Home: NextPage = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit, formState } = useForm<SiginInFormData>({
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SiginInFormData> = async (
    values,
    event
  ) => {
    event.preventDefault();
    await signIn(values);
  };

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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={4}>
            <Input
              type="email"
              label="E-mail"
              error={errors.email}
              {...register("email")}
            />
            <Input
              type="password"
              label="Senha"
              error={errors.password}
              {...register("password")}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async (ctx) => {
    return {
      props: {},
    };
  }
);
