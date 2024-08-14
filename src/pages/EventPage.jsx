import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { EditEvent } from "../components/EditEvent";
import { useState } from "react";
import { DeleteEvent } from "../components/DeleteEvent";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  if (!event.ok) {
    throw new Error(
      `Error while fetching this event: ${event.status} ${event.statusText}`
    );
  }
  const categories = await fetch("http://localhost:3000/categories");
  if (!categories.ok) {
    throw new Error(
      `Error while fetching the categories: ${categories.status} ${categories.statusText}`
    );
  }
  const users = await fetch("http://localhost:3000/users");
  if (!users.ok) {
    throw new Error(
      `Error while fetching the users: ${users.status} ${users.statusText}`
    );
  }
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [alertDeleteOpen, setAlertDeleteOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(event);

  return (
    <>
      <Center>
        <Box
          width={"60%"}
          height={"60%"}
          bg={"blue.100"}
          borderRadius={"xl"}
          mt={1}
          backgroundColor={'blue.400'}
        >
          <Link to={`/`}>
            <Tooltip label="Back to list all events">
              <Button
                fontWeight={"bold"}
                textColor={"black.300"}
                size={"md"}
              >
                {"< Back to list"}
              </Button>
            </Tooltip>
          </Link>

          <Center>
            <Heading fontSize={"2xl"} fontWeight={"bold"} pb={6} pt={6}>
              {currentEvent.title}
            </Heading>
          </Center>
          <Box w={"100%"} h={"300px"} mt={2} mb={4}>
            <Image
              src={currentEvent.image}
              alt={currentEvent.title}
              borderRadius={"sm"}
              boxSize={"100%"}
              objectFit={"cover"}
              objectPosition={"center"}
            ></Image>
          </Box>

          <SimpleGrid columns={1} spacing={5}>
            <Box p={4}>
              <Center>
                <Text
                  fontSize={"lg"}
                  fontWeight={"bold"}
                  fontStyle={"italic"}
                  color={"gray.600"}
                  textTransform={"uppercase"}
                >
                  {currentEvent.description}
                </Text>
              </Center>

              <Center>
                <Flex mt={5}>
                  <Text fontSize={"sm"} fontWeight={"bold"}>
                    Location:
                  </Text>
                  <Text fontSize={"sm"} fontWeight={"semibold"} pl={2}>
                    {currentEvent.location}
                  </Text>
                </Flex>
              </Center>

              <Center>
                <Flex flexDir={"column"}>
                  <Flex mt={2} flexDir={"row"}>
                    <Text pt={3} fontSize={"sm"} fontWeight={"bold"}>
                      Start:
                    </Text>
                    <Text pt={3} pl={4} fontSize={"sm"} fontWeight={"semibold"}>
                      {new Date(currentEvent.startTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                        hour24: true,
                      })}
                    </Text>
                  </Flex>
                  <Flex flexDir={"row"}>
                    <Text pt={3} fontSize={"sm"} fontWeight={"bold"}>
                      End:
                    </Text>
                    <Text pt={3} pl={6} fontSize={"sm"} fontWeight={"semibold"}>
                      {new Date(currentEvent.endTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                        hour24: true,
                      })}
                    </Text>
                  </Flex>
                </Flex>
              </Center>

              <Center>
                <Flex wrap="wrap" gap={4} mr={4} mt={7} mb={5}>
                  {categories
                    .filter((category) =>
                      currentEvent.categoryIds.includes(category.id)
                    )
                    .map((category) => (
                      <Text
                        key={category.name}
                        fontWeight={"bold"}
                        fontSize={"xs"}
                        backgroundColor={"red.300"}
                        borderRadius={"md"}
                        border={"black"}
                        px={1}
                        textTransform={"uppercase"}
                      >
                        {category.name}
                      </Text>
                    ))}
                </Flex>
              </Center>

              <Center mt={1}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Created by:
                </Text>
                {users
                  .filter((user) => user.id == currentEvent.createdBy)
                  .map((user) => (
                    <Text
                      key={user.id}
                      fontSize={"sm"}
                      fontWeight={"semibold"}
                      pl={3}
                      pr={3}
                    >
                      {user.name}
                    </Text>
                  ))}
                {users
                  .filter((user) => user.id == currentEvent.createdBy)
                  .map((user) => (
                    <Image
                      key={() => user.name + user.id}
                      src={user.image}
                      alt={user.name}
                      boxSize={"80px"}
                      objectFit={"cover"}
                      borderRadius={"10%"}
                      position={"relative"}
                      m={2}
                    ></Image>
                  ))}
              </Center>

              <Center mt={10}>
                <Button
                  w="100px"
                  mr={8}
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  borderRadius={"md"}
                  backgroundColor={"gray.300"}
                  _hover={{ backgroundColor: "green.300" }}
                  onClick={() => setModalEditOpen(true)}
                >
                  EDIT
                </Button>

                <Button
                  w="100px"
                  fontWeight={"bold"}
                  fontSize={"lg"}
                  borderRadius={"md"}
                  backgroundColor={"gray.300"}
                  _hover={{ backgroundColor: "green.300" }}
                  onClick={() => setAlertDeleteOpen(true)}
                >
                  DELETE
                </Button>
              </Center>
            </Box>
          </SimpleGrid>
        </Box>

        <EditEvent
          isOpen={modalEditOpen}
          onClose={() => {
            setModalEditOpen(false);
          }}
          mainEvent={currentEvent}
          setMainEvent={setCurrentEvent}
          categories={categories}
        ></EditEvent>

        <DeleteEvent
          isOpen={alertDeleteOpen}
          onClose={() => {
            setAlertDeleteOpen(false);
          }}
          event={currentEvent}
        ></DeleteEvent>
      </Center>
    </>
  );
};