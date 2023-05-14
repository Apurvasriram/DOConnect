import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Message = ({ isChatBotMessage, children }) => {
  let ctr = 1;
  if (isChatBotMessage && children.includes("https")) {
    return (
      <Flex
        flexDirection="column"
        maxW="90%"
        overflow="clip"
        borderRadius="lg"
        p={2}
        w="fit-content"
        backgroundColor={"blue.100"}
      >
        {children.split(",").map((text, index) => {
          const finalText = index % 2 == 0 ? `${ctr++}. ${text}` : text;

          if (text.includes("https")) {
            return (
              <Link isExternal key={index} color="green" href={text}>
                {finalText}
              </Link>
            );
          } else {
            return (
              <Text mb={2} key={index} textAlign={"start"} color={"black"}>
                {finalText}
              </Text>
            );
          }
        })}
      </Flex>
    );
  }
  return (
    <Flex justifyContent={isChatBotMessage ? "flex-start" : "flex-end"} my={2}>
      <Box
        maxW="90%"
        overflow="clip"
        borderRadius="lg"
        p={2}
        w="fit-content"
        backgroundColor={isChatBotMessage ? "blue.100" : "purple"}
      >
        <Text
          textAlign={isChatBotMessage ? "start" : "end"}
          color={isChatBotMessage ? "black" : "white"}
        >
          {children}
        </Text>
      </Box>
    </Flex>
  );
};
export default Message;
