import { Flex, Heading, ListItem } from "@chakra-ui/react";

const TimeLineItem = ({ title, subtitle }) => {
  return (
    <ListItem>
      <Flex flexDirection="column">
        <Flex
          my={4}
          w="fit-content"
          textAlign="left"
          // alignItems="flex-end"
          flexDirection="column"
        >
          <Heading w="fit-content" textAlign="left" fontSize="xl" fontWeight="bold">
            {title}
          </Heading>
          <Flex h={2} />
          <Heading w="fit-content" textAlign="left" fontSize="md" fontWeight="hairline">
            {subtitle}
          </Heading>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default TimeLineItem;
