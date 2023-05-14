import { Icon } from "@chakra-ui/icons";
import {
  Card,
  Image,
  CardBody,
  Text,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import { IoLocationSharp } from "react-icons/io5";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getPrettyDate = (dateInMillis) => {
  const date = new Date(dateInMillis);
  return `${
    MONTHS[date.getMonth()]
  }  ${date.getDate()} / ${date.getHours()}:${date.getMinutes()} GMT`;
};

const EventCard = ({ createdDateInMillis }) => (
  <Card w="xs" borderRadius={10}>
    <Image
      h={200}
      w="full"
      borderRadius={10}
      objectFit="cover"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQBQQfBzEsqTN91MHwdukq0yaBxWIcn5RjUw&usqp=CAU"
    />

    <CardBody>
      <Text fontWeight={"bold"}>
        With Chakra UI, I wanted to sync the speed of development with the speed
        of design. I wanted the developer to be just as excited as the designer
        to create a screen.
      </Text>
    </CardBody>

    <CardFooter justify="space-between">
      <Text fontWeight={"bold"}>
        {getPrettyDate(createdDateInMillis ?? Date.now())}
      </Text>

      <Flex alignItems="center">
        <Icon as={IoLocationSharp} mx={1} />
        <Text fontWeight={"bold"}>America</Text>
      </Flex>
    </CardFooter>
  </Card>
);

export default EventCard;
