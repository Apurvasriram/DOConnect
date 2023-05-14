import {
  Card,
  Avatar,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
  CardHeader,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAuthContext } from '../../../providers/AuthProvider';
import AWS from 'aws-sdk';

import ProfileForm from "./ProfileForm";

const ProfileCard = ({
  name = "John Doe",
  position = "Resident Doctor at NYU Langone Health",
  email = "johndoe@gmail.com",
  city = "New York",
}) => {
  const [profileDetails, setProfileDetails] = useState({
    name,
    position,
    email,
    city,
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const { userId, emailId } = useAuthContext();
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: 'doconnect-user-profile',
    KeyConditionExpression: 'userid = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Profile data recieved:", data)
      if (data.Items[0] != null) {
        setProfileDetails({
          name: data.Items[0].name,
          position: data.Items[0].position,
          email: emailId,
          city: data.Items[0].city
        });
      }
      else{
        setProfileDetails({
        name : "Update your name",
        position : "Update your position",
        email : emailId,
        city : "Update your city"
        });
      }
    }
  });

  return (
    <>
      <Card
        py={1}
        justifyContent="space-evenly"
        alignItems="center"
        backgroundColor="background.profile"
        direction="row"
        variant="outline"
      >
        <Avatar boxSize="52" bg="black" />

        <Stack alignItems="flex-start">
          <CardHeader px={0}>
            <Heading variant="h2">{profileDetails.name}</Heading>
          </CardHeader>
          <CardBody p={0}>
            <Box>
              <Text variant="heading4" fontWeight="semibold">
                {profileDetails.position}
              </Text>
            </Box>
            <Box>
              <Text>{profileDetails.city}</Text>
            </Box>
            <Box>
              <Text>{profileDetails.email}</Text>
            </Box>
          </CardBody>

          <CardFooter px={0}>
            <Button onClick={() => setFormOpen(true)}>Edit</Button>
          </CardFooter>
        </Stack>
      </Card>
      {isFormOpen && (
        <ProfileForm
          onCancelClicked={() => setFormOpen(false)}
          onSubmit={(formDetails) => {
            AWS.config.update({
              accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
              secretAccessKey: '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',
              region: 'us-east-1'
            });
            const docClient = new AWS.DynamoDB.DocumentClient({
              region: 'us-east-1'
            });
            const params = {
              TableName: 'doconnect-user-profile',
              Item: {
                userid: userId,
                name: formDetails.name,
                position: formDetails.position,
                city: formDetails.city
              }
            };

            docClient.put(params, (err, data) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Record written to DynamoDB:', data);
              }
            });
            setProfileDetails(formDetails)
          }}
        />
      )}
    </>
  );
};

export default ProfileCard;
