import { ChatIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useAuthContext } from '../../providers/AuthProvider';

const ChatBotTriggerBtn = ({ onClick }) => {
  const { isLoggedIn } = useAuthContext();
  if (isLoggedIn) {
    return (
      <IconButton
        onClick={onClick}
        borderRadius="full"
        colorScheme="green"
        boxSize={12}
        icon={<ChatIcon />}
      />
    );
  }
};

export default ChatBotTriggerBtn;
