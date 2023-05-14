import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { chatBotMenuOptions } from "../../constants";

const ChatBotMenu = ({ onMenuOptionChange }) => {
  return (
    <Menu>
      <MenuButton boxSize={5} color="white">
        <BsThreeDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          onChange={onMenuOptionChange}
          defaultValue="0"
          title="Chatbot Options"
          type="radio"
        >
          {chatBotMenuOptions.map((name, index) => (
            <MenuItemOption
              key={index}
              value={index.toString()}
              children={name}
            />
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default ChatBotMenu;
