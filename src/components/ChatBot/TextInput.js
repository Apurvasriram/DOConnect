import {
  IconButton,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";

const TextInput = ({ onSubmitClicked }) => {
  const [inputValue, setValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onSubmitClicked(inputValue);
      setValue("");
    }
  };

  return (
    <InputGroup>
      <Input
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a query"
        backgroundColor="white"
      />
      <InputRightElement
        onClick={handleSubmit}
        children={<IconButton icon={<IoSend />} />}
      />
    </InputGroup>
  );
};

export default TextInput;


// import {
//   IconButton,
//   InputGroup,
//   InputRightElement,
//   Input,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { IoSend } from "react-icons/io5";

// const TextInput = ({ onSubmitClicked }) => {
//   const [inputValue, setValue] = useState("");

//   return (
//     <InputGroup>
//       <Input
//         value={inputValue}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder="Type a query"
//         backgroundColor="white"
//       />
//       <InputRightElement
//         onClick={() => {
//           setValue("");
//           onSubmitClicked(inputValue);
//         }}
//         children={<IconButton icon={<IoSend />} />}
//       />
//     </InputGroup>
//   );
// };

// export default TextInput;
