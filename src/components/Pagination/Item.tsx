import { Button } from "@chakra-ui/react";

interface ItemProps {
  number: number;
  isCurrent?: boolean;
}

export function Item({ isCurrent = false, number }: ItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ bgColor: "pink.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="gray.700"
      disabled
      _disabled={{ bgColor: "gray.500" }}
    >
      {number}
    </Button>
  );
}
