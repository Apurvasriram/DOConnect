import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Button,
  Heading,
} from "@chakra-ui/react";

const NavCard = ({ title, body, buttonText, destinationSlug }) => (
  <Card backgroundColor={"background.gray"} maxW={350} m={2} align="center">
    <CardHeader textAlign={"center"}>
      <Heading size="md"> {title}</Heading>
    </CardHeader>
    <CardBody>
      <Text variant="heading5">{body}</Text>
    </CardBody>
    <CardFooter>
      <Button variant={"navCardBtn"}>{buttonText.toUpperCase()}</Button>
    </CardFooter>
  </Card>
);

export default NavCard;
