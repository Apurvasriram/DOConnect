import { Container, Heading, Box } from "@chakra-ui/react";

import EventsCatalogue from "./components/EventsCatalogue";
import FilterEventsTab from "./components/FilterEventsTab";

const EventsPage = () => {
  return (
    <Container px={0} my={10} variant="responsive">
      <Box>
        <Heading my={5} fontWeight={"semibold"} variant="h2" textAlign="center">
          Find events on DOConnect
        </Heading>
      </Box>
      <FilterEventsTab />
      <EventsCatalogue />
    </Container>
  );
};

export default EventsPage;
