import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    < >
      <Box backgroundColor={"blue.400"} mt={4}>
        <Text
          textAlign={"center"}
          fontWeight={"semibold"}
          fontSize={"lg"}
          color={"black.200"}
          pb={1}
        >
          Have fun with the events
        </Text>
      </Box>
    </>
  );
};