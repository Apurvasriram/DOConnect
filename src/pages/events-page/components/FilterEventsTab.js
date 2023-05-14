import { HStack, IconButton, Input, Select } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterEventsTab = () => (
  <HStack
    p={5}
    my={10}
    spacing={2}
    backgroundColor="title.filterTab"
    justifyContent="space-between"
    w="full"
  >
    <Input placeholder="Filter by Keyword" backgroundColor="white" />
    <Select placeholder="Select Location" backgroundColor="white"></Select>
    <Input
      placeholder="From date"
      backgroundColor="white"
      w={["sm", "md", "lg", "5xl"]}
      type="date"
    />
    <Input
      placeholder="To date"
      backgroundColor="white"
      w={["sm", "md", "lg", "5xl"]}
      type="date"
    />
    <IconButton colorScheme="blue" icon={<SearchIcon />} />
  </HStack>
);

export default FilterEventsTab;
