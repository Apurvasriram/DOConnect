import {
  Card,
  Heading,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { useState } from "react";

import FileInput from "./FileInput";
import TextInput from "./TextInput";
import ChatBotMenu from "./ChatBotMenu";
import { chatBotMenuOptions } from "../../constants";
import Message from "./Message";
import axios from "axios";
import { useAuthContext } from "../../providers/AuthProvider";

const ChatWindow = ({ onClick }) => {
  const [isTextInput, setIsTextInput] = useState(true);
  const [messages, setMessages] = useState([]);
  const { userId } = useAuthContext();

  const parseMessageAndRespond = async (enteredMessage) => {
    const acceptedValues = [
      "yes",
      "Yes",
      "yes analyze",
      "analyze, Analyze, yep",
    ];
    let mes = enteredMessage;
    console.log("mes",mes);


    if (acceptedValues.includes(enteredMessage)) {
      let pdf = messages[messages.length - 2].message;
      console.log(pdf);
      pdf = pdf.split(" ")[0];
      console.log("pdf name", pdf, 300);
      mes = pdf + "+" + userId;
    }
    
    // if(mes.includes(".pdf"))
    const chatbotMessage = await axios.post(
      "https://z26ug5h5f2.execute-api.us-east-1.amazonaws.com/v1/chatbot",
      {
        messages: [
          {
            type: "unstructured",
            unstructured: {
              text: mes,
            },
          },
        ],
      }
    );

    console.log(chatbotMessage);
    // console.log(messages);

    const retString = JSON.parse(chatbotMessage.data.body)["messages"][0][
      "unstructured"
    ]["text"];

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: retString, isChatBotMessage: true },
    ]);
  };

  const getParsedHttpMessage = (msg) => {
    let finalMsg = "";
    let i;
    let counter = 1;
    for (i = 0; i < msg.length; i++) {
      if (i % 2 == 0) {
        msg[i] = `${counter} ${msg[i]} \n`;
      } else {
        msg[i] += "\n";
      }
      finalMsg = finalMsg + msg[i];
      counter += 1;
    }
    return finalMsg;
  };

  const handleEnteredQuery = (enteredMessage) => {
    if (enteredMessage === null || enteredMessage.length === 0) return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: enteredMessage, isChatBotMessage: false },
    ]);

    parseMessageAndRespond(enteredMessage);
  };

  const handleMenuOptionChange = (index) => {
    if (index === (chatBotMenuOptions.length - 1).toString()) {
      return onClick();
    }

    setIsTextInput((prevState) => !prevState);
  };

  return (
    <Card w="sm" h="md" background="blackAlpha.900">
      <CardHeader
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading color="white" size="md">
          DOConnect Chatbot
        </Heading>
        <ChatBotMenu onMenuOptionChange={handleMenuOptionChange} />
      </CardHeader>
      <CardBody
        overflow="scroll"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <Message
          children="Please upload a file, or type in a query"
          isChatBotMessage
        />
        {messages.map((msgObj, index) => (
          <Message
            isChatBotMessage={msgObj.isChatBotMessage}
            key={index}
            children={msgObj.message}
          />
        ))}
      </CardBody>
      <CardFooter>
        {isTextInput ? (
          <TextInput onSubmitClicked={handleEnteredQuery} />
        ) : (
          <FileInput setMessages={setMessages} />
        )}
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
