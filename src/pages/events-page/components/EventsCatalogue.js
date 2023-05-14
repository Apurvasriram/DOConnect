import { Wrap, WrapItem } from "@chakra-ui/react";
import EventCard from "../../../components/EventCard";

const EventsCatalogue = () => (
  <Wrap spacing={10} justify="center">
    {[1, 2, 3, 4, 5, 6, 1, 1, 1].map((cardInfo, index) => (
      <WrapItem key={index}>
        <EventCard />
      </WrapItem>
    ))}
  </Wrap>
);

export default EventsCatalogue;
