import React from "react";
import { Link } from "react-router-dom";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <>
      <Flex pt={4} pl={4} backgroundColor={"blue.400"}>
        <Link to={`/new`}>
          <Button
            w="120px"
            fontSize={"lg"}
            borderRadius={"md"}
            backgroundColor={"white.300"}
            _hover={{ backgroundColor: "red.300" }}
          >
            Add Event
          </Button>
        </Link>
        <Link to={`/`}>
          <Button
            w="120px"
            ml={5}
            fontSize={"lg"}
            borderRadius={"md"}
            backgroundColor={"white.300"}
            _hover={{ backgroundColor: "red.300" }}
          >
            Home
          </Button>
        </Link>
      </Flex>
      <Center backgroundColor={"blue.400"}>
        <Heading color={"black"} fontWeight={"semibold"} fontSize={"5xl"} mb={3} mt={3}>
          Winc Event Planner
        </Heading>
      </Center>
    </>
  );
};