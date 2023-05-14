import { useState } from "react";
import ChatBotTriggerBtn from "./ChatBotTriggerBtn";
import ChatWindow from "./ChatWindow";
import { Box } from "@chakra-ui/react";

const ChatBot = () => {
  const [isChatWindowVisible, setChatBotVisible] = useState(false);
  return (
    <Box position="fixed" bottom={10} right={10} zIndex="chatBot">
      {!isChatWindowVisible && (
        <ChatBotTriggerBtn onClick={() => setChatBotVisible(true)} />
      )}
      {isChatWindowVisible && (
        <ChatWindow onClick={() => setChatBotVisible(false)} />
      )}
    </Box>
  );
};

export default ChatBot;
