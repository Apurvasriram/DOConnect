import React, { useState, useEffect } from 'react';
import RecordsTable from "./components/RecordsTable";
import AWS from 'aws-sdk';
import { useAuthContext } from '../../providers/AuthProvider';

const PatientRecordsPage = () => {
  const { userId } = useAuthContext();
  AWS.config.update({
    accessKeyId: 'AKIA4W7FFVFRKSJIONJW',
    secretAccessKey: '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',
    region: 'us-east-1'
  });

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const params = {
      TableName: 'Patient_record',
      IndexName: 'user_id-index',
      KeyConditionExpression: 'user_id = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    dynamodb.query(params, (err, data) => {
      if (err) {
        console.error(err);
        setLoading(false);
      } else {
        const transformedRecords = data.Items.map(item => ({
          name: item.Name,
          age: parseInt(item.Age),
          sex: item.Sex,
          number: item.Number,
          diseases: {
            Cholesterol: parseInt(item.Cholesterol),
            BloodPressure: parseInt(item.BloodPressure),
            Glucose: parseInt(item.Glucose),
            Insulin: parseInt(item.Insulin),
            BMI: parseInt(item.BMI),
          },
          pdf: item.pdf,
        }));
        setRecords(transformedRecords);
        setLoading(false);
      }
    });
  }, [dynamodb, userId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <RecordsTable records={records} />
      )}
    </div>
  );
};

export default PatientRecordsPage;


