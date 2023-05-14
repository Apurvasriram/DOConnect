import { Box, Textarea, useToast } from "@chakra-ui/react";

import FormFooter from "./FormFooter";
import { useState } from "react";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../../providers/AuthProvider';
AWS.config.update({
  accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const toast = useToast();
  const { userId } = useAuthContext();
  const onSubmit = (images) => {
    if (!images || !images.length || !content) {
      toast({
        title: "Please add an image, and enter some content",
        status: "error",
        isClosable: true,
      });
      return;
    }
    const post_id = uuidv4();
    for (let i = 0; i < images.length; i++) {
      const blobUrl = images[i].url;
      let dataUrl = null;
      convertBlobToDataUrl(blobUrl, (url) => {
        dataUrl = url;

        const xhr = new XMLHttpRequest();
        xhr.open("GET", dataUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          const blob = xhr.response;

          const s3 = new AWS.S3({ region: "us-east-1" });
          const params = {
            Bucket: "feedpostimages",
            Key: `${new Date().getTime()}.png`,
            Body: blob,
            ContentType: "image/png",
            ACL: "public-read",
            Metadata: { 
              PostContent: content,
              UserID: userId,
              PostID: post_id
            }
          };
          s3.upload(params, function (err, data) {
            if (err) {
              console.error(err);
              return;
            }
            console.log("uploading to s3", data.Location);
          });
        };
        xhr.send();
      });
    } 
    setContent("");
    onPostCreated();
  };

  // convert a Blob URL to a data URL using a canvas element
  const convertBlobToDataUrl = (blobUrl, callback) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      callback(dataUrl);
    };
    img.src = blobUrl;
  };


  return (
    <Box my={5} w="full" border="navBar" borderRadius="lg">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        _focus={{ boxShadow: "none" }}
        border="none"
        resize="none"
        placeholder="Start typing to create new post ..."
      />
      <FormFooter onSubmit={onSubmit} />
    </Box>
  );
};

export default CreatePost;
