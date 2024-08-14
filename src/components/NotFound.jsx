import { Text, Heading, Center, Flex, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <Box h={500}>
        <Center>
          <Flex direction={"column"}>
            <Heading mt={20}>The page cannot be found</Heading>
            <Link to={"/"}>
              <Flex direction={"row"}>
                <Text mt={10} mr={1} fontSize={"lg"}>
                  Click
                </Text>
                <Text
                  mt={10}
                  mr={1}
                  textColor={"black"}
                  fontStyle={"italic"}
                  fontWeight={"semibold"}
                  fontSize={"lg"}
                >
                  here
                </Text>
                <Text mt={10} fontSize={"lg"}>
                  to return to homepage
                </Text>
              </Flex>
            </Link>
          </Flex>
        </Center>
      </Box>
    </>
  );
};