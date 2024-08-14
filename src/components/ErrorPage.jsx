import { Box, Center, Flex, Text, Heading } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  let error = useRouteError();
  console.log(
    "ERROR"
  );
  console.log(error);
  return (
    <>
      <Box h={500} backgroundColor={"red.500"}>
        <Center>
          <Flex direction={"column"}>
            <Heading mt={20}>Page Not Found !</Heading>
            <Text mt={8} fontWeight={"bold"}>
              {error.status}
            </Text>
            <Text mt={8} fontWeight={"bold"}>
              {error.message}
            </Text>
            <Text mt={8} fontWeight={"bold"}>
              {error.data}
            </Text>
            <Text mt={4}>Please Contact The Helpdesk</Text>
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