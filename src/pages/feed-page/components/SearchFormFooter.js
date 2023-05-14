import { Button, Flex } from "@chakra-ui/react";


const SearchFormFooter = ({ onSubmit }) => {
  return (
    <Flex p={2} alignItems="flex-end">
      <Button
        colorScheme="facebook"
        onClick={() => {
          onSubmit();
        }}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchFormFooter;
