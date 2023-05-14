import {
  Card,
  CardBody,
  CardHeader,
  UnorderedList,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../../providers/AuthProvider';

import TimeLineForm from "./TimeLineForm";
import TimeLineItem from "./TimeLineItem";

const TimeLineCard = ({ heading, detailsList = [], tableName }) => {
  const [details, setDetails] = useState(detailsList);
  const [isFormOpened, setFormOpened] = useState(false);
  const { userId } = useAuthContext();
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: tableName,
    IndexName: 'userid-index',
    KeyConditionExpression: 'userid = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };

  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(heading,"data recieved:", data)
      var timeline_data = []
      const items = data.Items
      for(var i=0 ; i<items.length; i++ ){
        const title = items[i].title
        const subtitle = items[i].subtitle
        timeline_data = [...timeline_data, {title,subtitle}]
      }
      console.log(heading, "timeline data:",timeline_data)
      setDetails(timeline_data);
    }
  });

  return (
    <>
      <Card my={8} boxShadow="2xl">
        <CardHeader display="flex" alignItems="center">
          <Heading variant="h4" fontWeight="bold">
            {heading}
          </Heading>
          <IconButton
            onClick={() => setFormOpened(true)}
            ml={1}
            size="xs"
            bg="white"
            icon={<AddIcon />}
          />
        </CardHeader>
        <CardBody>
          <UnorderedList>
            {details.map((detail, index) => (
              <TimeLineItem
                key={index}
                title={detail.title}
                subtitle={detail.subtitle}
              />
            ))}
          </UnorderedList>
        </CardBody>
      </Card>
      {isFormOpened && (
        <TimeLineForm
          heading={heading}
          onCancelClicked={() => setFormOpened(false)}
          onSubmit={(title, subtitle) => {
            const timelineid = uuidv4(); 
            AWS.config.update({
              accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
              secretAccessKey: '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',
              region: 'us-east-1'
            });
            const docClient = new AWS.DynamoDB.DocumentClient({
              region: 'us-east-1'
            });
            const params = {
              TableName: tableName,
              Item: {
                timelineid: timelineid,
                userid: userId,
                exp_index: details.length,
                title: title,
                subtitle: subtitle,
              }
            };

            docClient.put(params, (err, data) => {
              if (err) {
                console.error(err);
              } else {
                console.log('Record written to DynamoDB:', data);
              }
            });
            setDetails((prev) => [...prev, { title, subtitle }])
          }}
        />
      )}
    </>
  );
};

export default TimeLineCard;
