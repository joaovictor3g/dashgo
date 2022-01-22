import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>João Victor</Text>
          <Text color="gray.300" fontSize="small">
            jvdias1717@gmail.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        name="João Victor"
        src="https://github.com/joaovictor3g.png"
      />
    </Flex>
  );
}
