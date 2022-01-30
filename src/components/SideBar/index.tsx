import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSideBarDrawer } from "@/contexts";
import { SideBarNav } from "./SideBarNav";

export function Sidebar() {
  const { isOpen, onClose } = useSideBarDrawer();

  const isFloatingSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isFloatingSidebar) {
    return (
      <Drawer
        isOpen={isOpen as boolean}
        placement="left"
        onClose={onClose as () => {}}
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SideBarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8">
      <SideBarNav />
    </Box>
  );
}
