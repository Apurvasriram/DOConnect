import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import EventCard from "../../../components/EventCard";

const MyEventsCard = () => {
  return (
    <Card py={2}>
      <CardHeader>
        <Heading variant="h4" fontWeight="bold">
          My Events
        </Heading>
      </CardHeader>
      <CardBody>
        <Wrap justify="center">
          {[1].map((cardInfo, index) => (
            <WrapItem key={index}>
              <EventCard />
            </WrapItem>
          ))}
        </Wrap>
      </CardBody>
    </Card>
  );
};

export default MyEventsCard;
