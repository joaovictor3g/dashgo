import { ElementType } from "react";
import Link from "next/link";
import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react";
import { ActiveLink } from "../ActiveLink";
interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" color="white" py="1" {...rest}>
        <Icon as={icon} fontSize={20} />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
