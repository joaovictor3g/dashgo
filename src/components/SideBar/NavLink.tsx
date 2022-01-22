import { Icon, Link, Text, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" align="center" color="white" py="1" {...rest}>
      <Icon as={icon} fontSize={20} />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
