import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import decode from "jwt-decode";

import { Header, Sidebar } from "@/components";
import { setupApiClient } from "@/services";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "@/utils";
import { Can } from "@/components/Can";
import { useAuth } from "@/contexts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "Series1", data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <Flex direction="column" h="100vh">
      <Can permissions={["metrics.list"]}>
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth={["320px", "400px"]}
            align="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
              <Text>Inscritos da semana</Text>
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            </Box>

            <Box p="8" bg="gray.800" borderRadius={8}>
              <Text>Taxa de entrada</Text>
              <Chart
                type="area"
                height={160}
                options={options}
                series={series}
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Can>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
