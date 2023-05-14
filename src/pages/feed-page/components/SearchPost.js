import { Box, Input, InputGroup, InputRightElement, IconButton, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import AWS from 'aws-sdk';
import axios from 'axios';
// import { Client } from '@elastic/elasticsearch';

import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../../providers/AuthProvider';
AWS.config.update({
  accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
  secretAccessKey: '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',
  region: 'us-east-1',
});


const SearchPost =  ({ onPostCreated }) => {
  const [searchValue, setSearchValue] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();
  const { userId } = useAuthContext();
  

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchPosts = (searchQuery) => {
    
    
  };

  const handleSearch = () => {
    if (!searchValue) {
      // Show an error message if the search value is empty
      toast({
                title: "Enter some query to search",
                status: "error",
                isClosable: true,
              });
      
      return;
    }

    onPostCreated(searchValue)
    setSearchValue("");
  };

  return (
    <Flex p={2} alignItems="flex-end">
      <Box my={5} w="full" h={10} border="navBar" borderRadius="lg">
        <InputGroup>
          <Input
            placeholder="Type a query to search through posts ..."
            value={searchValue}
            onChange={handleSearchChange}
            _focus={{ boxShadow: "none" }}
            border="none"
            resize="none"
          />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              onClick={handleSearch}
              colorScheme="facebook"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default SearchPost;



// import { Box, Textarea, useToast, Flex,Button } from "@chakra-ui/react";

// import SearchFormFooter from "./SearchFormFooter";
// import { useState } from "react";
// import AWS from 'aws-sdk';
// import { v4 as uuidv4 } from 'uuid';
// import { useAuthContext } from '../../../providers/AuthProvider';
// AWS.config.update({
//   accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
//   secretAccessKey: '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',
//   region: 'us-east-1',
// });

// const SearchPost = ({ onPostCreated }) => {
//   const [content, setContent] = useState("");
//   const toast = useToast();
//   const { userId } = useAuthContext();
//   const onSubmit = () => {
//     if (!content) {
//       toast({
//         title: "Enter some query to search",
//         status: "error",
//         isClosable: true,
//       });
//       return;
//     }
//     // const post_id = uuidv4();
//     // for (let i = 0; i < images.length; i++) {
//     //   const blobUrl = images[i].url;
//     //   let dataUrl = null;
//     //   convertBlobToDataUrl(blobUrl, (url) => {
//     //     dataUrl = url;

//     //     const xhr = new XMLHttpRequest();
//     //     xhr.open("GET", dataUrl, true);
//     //     xhr.responseType = "blob";
//     //     xhr.onload = function () {
//     //       const blob = xhr.response;

//     //       const s3 = new AWS.S3({ region: "us-east-1" });
//     //       const params = {
//     //         Bucket: "feedpostimages",
//     //         Key: `${new Date().getTime()}.png`,
//     //         Body: blob,
//     //         ContentType: "image/png",
//     //         ACL: "public-read",
//     //         Metadata: { 
//     //           PostContent: content,
//     //           UserID: userId,
//     //           PostID: post_id
//     //         }
//     //       };
//     //       s3.upload(params, function (err, data) {
//     //         if (err) {
//     //           console.error(err);
//     //           return;
//     //         }
//     //         console.log("uploading to s3", data.Location);
//     //       });
//     //     };
//     //     xhr.send();
//     //   });
//     // } 
//     onPostCreated(content);
//     setContent("");
    
//   };


//   return (
//     <Flex p={2} alignItems="flex-end">
//     <Box my={5} w="full" h={10} border="navBar" borderRadius="lg">
//       <Textarea 
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         _focus={{ boxShadow: "none" }}
//         border="none"
//         resize="none"
//         placeholder="Type a query to search through posts ..."
//       />
//       <Flex p={2} alignItems="flex-end">
//       <Button
//         colorScheme="facebook"
//         onClick={() => {
//           onSubmit();
//         }}
//       >
//         Searc
//       </Button>
//     </Flex>
      
//       {/* <SearchFormFooter onSubmit={onSubmit} /> */}
//     </Box>
//     </Flex>
//   );
// };

// export default SearchPost;
