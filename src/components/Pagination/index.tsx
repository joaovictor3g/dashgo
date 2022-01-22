import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { Item as PaginationItem } from "./Item";

export function Pagination() {
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <Text as="strong">0</Text> - <Text as="strong"> 10</Text> de{" "}
        <Text as="strong">100</Text>
      </Box>

      <HStack spacing="2">
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
        <PaginationItem number={4} />
      </HStack>
    </Stack>
  );
}
