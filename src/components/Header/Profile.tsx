import { useAuth } from "@/contexts";
import {
  Avatar,
  Box,
  Flex,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useAuth();

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>João Victor</Text>
          <Text color="gray.300" fontSize="small">
            {user?.email}
          </Text>
        </Box>
      )}
      <Menu placement="start">
        <MenuButton aria-label="Options">
          <Avatar
            size="md"
            name="João Victor"
            src="https://github.com/joaovictor3g.png"
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={signOut}>Sair</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
