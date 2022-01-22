import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface SidebarDrawerProviderProvider {
  children: ReactNode;
}

type SideBarDrawerContextData = UseDisclosureProps;

const SideBarDrawerContext = createContext({} as SideBarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProvider) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SideBarDrawerContext.Provider value={disclosure}>
      {children}
    </SideBarDrawerContext.Provider>
  );
}

export const useSideBarDrawer = () => useContext(SideBarDrawerContext);
