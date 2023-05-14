import {
  IconButton,
  InputGroup,
  InputRightElement,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";
import { useAuthContext } from '../../providers/AuthProvider';

import AWS from 'aws-sdk';
AWS.config.update({
  accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const s3 = new AWS.S3({ region: "us-east-1" });

const FileInput = ({ setMessages }) => {
  const { userId } = useAuthContext();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    if(e.target.files == null || e.target.files.length==0) return ;

    const params = {
      Bucket: "patientrecord",
      Key: e.target.files[0].name,
      Body: e.target.files[0],
      Metadata: { 
        UserID: userId,
      }
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        const success_messages =  e.target.files[0].name+ " added to database successfully"
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: success_messages, isChatBotMessage: true },
        ]);
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: "Do you want to analyze the document?", isChatBotMessage: true },
        ]);
      }
    });
  };

  return (
    <InputGroup>
      <Box>
        <Input onChange={onFileChange} type="file" />
        <Box
          pointerEvents="none"
          pl={3}
          pt={2}
          backgroundColor="white"
          position="absolute"
          bottom={0}
          top={0}
          left={0}
          right={0}
        >
          <Text> Upload a file</Text>
        </Box>
      </Box>
      <InputRightElement children={<IconButton icon={<IoSend />} />} />
    </InputGroup>
  );
};

export default FileInput;
