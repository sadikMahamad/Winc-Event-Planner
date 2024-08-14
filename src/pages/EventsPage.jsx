import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Image,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  if (!events.ok)
    throw new Error(
      `Error while fetching events.json: ${events.status} ${events.statusText}`
    );
  const categories = await fetch("http://localhost:3000/categories");
  if (!categories.ok)
    throw new Error(
      `Error while fetching categories.json: ${categories.status} ${categories.statusText}`
    );
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [radioValue, setRadioValue] = useState("0"); // 0 is the default "All"

  // Handler for search input
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  // First filter events on searchField
  const matchedEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  // Then filter events on type (radioValue 0 = "All" )
  const selectedEvents = matchedEvents.filter((event) => {
    if (!Number(radioValue) == 0)
      return event.categoryIds.includes(Number(radioValue));
    else return event;
  });

  return (
    <>
      <Box backgroundColor={'blue.400'}>
        <Center>
          <Flex flexDir={"column"} wrap={"wrap"}>
            <Input
              placeholder="Search event"
              textAlign={"left"}
              fontStyle={"italic"}
              backgroundColor={"white"}
              textColor={"gray.800"}
              fontWeight={"semibold"}
              onChange={handleChange}
              w={[500]}
              mt={1}
              mb={3}
            ></Input>
          </Flex>
        </Center>

        <Center>
          {/* value string for radiobuttons */}
          <RadioGroup onChange={setRadioValue} value={radioValue.toString()}>
            <Center>
              <Text fontWeight={"semibold"} fontSize={"lg"} pb={1}>
                Filter by event:
              </Text>
            </Center>
            <Stack direction="row" mb={5}>
              <Radio key={0} value={"0"} id={0}>
                All
              </Radio>
              {categories.map((category) => (
                <Radio key={category.id} value={category.id.toString()} pl={6}>
                  <Text textTransform={"capitalize"}>{category.name}</Text>
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Center>

        {selectedEvents.length > 0 ? (
          <SimpleGrid columns={3} gap={6} p={3}>
            {selectedEvents.map((event) => (
              <Card
                key={event.id}
                borderRadius="xl"
                cursor="pointer"
                _hover={{ transform: "scale(1.01)" }}
                bgColor={"gray.200"}
                
              >
                <Link to={`event/${event.id}`}>
                  <CardHeader h={200} p={0}>
                    <Image
                      src={event.image}
                      alt={event.title}
                      borderRadius="5% 5% 0% 0%"
                      boxSize={"100%"}
                      objectFit={"cover"}
                      objectPosition={"center"}
                    />
                  </CardHeader>

                  <CardBody textAlign={"center"} color={"black.700"}>
                    <Text fontWeight={"bold"} fontSize={"xl"}>
                      {event.title}
                    </Text>
                    <Text fontStyle={"italic"} pt={2}>
                      {event.description}
                    </Text>
                    <Text pt={1}>
                      Start:{" "}
                      {new Date(event.startTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                        hour24: true,
                      })}
                    </Text>
                    <Text>
                      End:{" "}
                      {new Date(event.endTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                        hour24: true,
                      })}
                    </Text>
                    <Flex wrap="wrap" gap={2} mr={1} mt={2} justify={"center"}>
                      {categories
                        .filter((category) =>
                          event.categoryIds.includes(category.id)
                        )
                        .map((category) => (
                          <Text
                            key={category.id}
                            fontWeight={"bold"}
                            fontSize={"xs"}
                            backgroundColor={"yellow.300"}
                            borderRadius={"md"}
                            border={"black"}
                            px={1}
                            textTransform={"uppercase"}
                          >
                            {category.name}
                          </Text>
                        ))}
                    </Flex>
                  </CardBody>
                </Link>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={1} gap={6} p={3}>
            <Center mt={12} mb={12}>
              <Text
                fontWeight={"semibold"}
                fontStyle={"italic"}
                fontSize={"2xl"}
              >
                No events found
              </Text>
            </Center>
          </SimpleGrid>
        )}
      </Box>
    </>
  );
};