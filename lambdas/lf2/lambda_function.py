import json
import boto3
import requests
from requests.auth import HTTPBasicAuth
import time


def lambda_handler(event, context):
    print("Event is:",event)
    s3 = boto3.client('s3')
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('doconnect-posts')

    try:
        for record in event['Records']:
            bucket = record['s3']['bucket']['name']
            key = record['s3']['object']['key']
            metadata = s3.head_object(Bucket=bucket, Key=key)['Metadata']
            print(f"S3 head: {s3.head_object(Bucket=bucket, Key=key)}, metadata: {metadata}")
            
            metadata["createdAtTimeStamp"] = f"{time.time()}"
            response = table.get_item(Key={'postid': metadata['postid']})
    
            item = response.get('Item')
            if not item:
                metadata['imagekey'] = key
                table.put_item(
                    Item=metadata
                )
        
            else:
                table.update_item(
                    Key={'postid': metadata['postid']},
                    UpdateExpression='SET imagekey = :new_value',
                    ExpressionAttributeValues={
                        ':new_value': item['imagekey'] + ',' + key
                    }
                )
            url = 'http://34.207.127.200:8082/topics/doconnect-kafka-topic'
            headers = {
                'Content-Type': 'application/vnd.kafka.json.v2+json'
            }
            payload = {
                "records": [
                    {
                        "value": {
                            "source": "storefeedpostlambda",
                            "purpose": "doconnect",
                            "postid": f"{metadata['postid']}",
                            "postcontent":f"{metadata['postcontent']}",
                            "userid":f"{metadata['userid']}"
                        }
                    }
                ]
            }

            es_url = "https://search-doconnect-posts-domain-22hrxxgqibw6ee47eu2impl67m.us-east-1.es.amazonaws.com/posts/_doc"
            headers = {'Content-Type': 'application/json'}
            data = {
                "postid": f"{metadata['postid']}",
                "postcontent":f"{metadata['postcontent']}",
            }
            response = requests.post(es_url,auth=HTTPBasicAuth('cloudprojmaster', 'Doconnect123@'), headers=headers, data=json.dumps(data))
            response.raise_for_status()
            print("Success: ", response)
        
            # response = requests.post(url, headers=headers, json=payload)
            # if response.status_code == 200:
            #     print('Kafka Topic API call successful')
            #     print(response.json())
            # else:
            #     print(f'Kafka Topic API call failed with status code {response.status_code}. Error message: {response.content}')

            
    except Exception as e:
        print(e)
    return {
        'statusCode': 200,
        'event':event,
        'body': json.dumps('Hello from storefeedpostlambda Lambda!')
    }