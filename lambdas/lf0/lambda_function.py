import json
import boto3
from boto3.dynamodb.conditions import Key
import requests
import uuid


class Unstructured:
    def __init__(self,msg):
        self.text = msg

class Message:
    def __init__(self, msgtext):
        self.type = "unstructured"
        self.unstructured = Unstructured(msgtext)
        # self.structured = Unstructured() #Should change this if required

class BotReponse:
    def __init__(self):
        self.messages = []
    
    def appendNewMessage(self,newMessage):
        if not isinstance(newMessage,Message):
            return
        
        self.messages.append(newMessage)


def lambda_handler(event, context):
    outputObj = BotReponse()
    print(event)


    if "messages" in event and event["messages"]:
        for i in range(len(event["messages"])):
            msg = event["messages"][i]["unstructured"]["text"]
            print("msg from front end ", msg)
            retmsg = Message(processMsg(msg))
            print("returning message:",retmsg)

            outputObj.appendNewMessage(retmsg)
            

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(outputObj,default=to_serializable)
        }
    
    else:
        s3 = boto3.client('s3')
        textract = boto3.client('textract')
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('Patient_record')

        for record in event['Records']:
            # Get the S3 bucket and key for the uploaded file
            bucket = record['s3']['bucket']['name']
            key = record['s3']['object']['key']

            # Use Textract to extract text from the file
            response = textract.detect_document_text(
                Document={
                    'S3Object': {
                        'Bucket': bucket,
                        'Name': key
                    }
                }
            )

            metadata = s3.head_object(Bucket=bucket, Key=key)['Metadata']
            print("metadata is", metadata)
            # print("metadata")
            user_id=metadata['userid']

            # Extract key-value pairs from the text
            key_values = {}
            lines = []
            for block in response['Blocks']:
                if block['BlockType'] == 'LINE':
                    lines.append(block['Text'])
            for line in lines:
                parts = line.split(':')
                if len(parts) == 2:
                    key = parts[0].strip()
                    value = parts[1].strip()
                    key_values[key] = value
            item_uuid = str(uuid.uuid4())
            key_values['record_id'] = item_uuid
            key_values['user_id'] = user_id
            Item=key_values
            print("item is :", key_values)


            table.put_item(Item=key_values)
            print(json.dumps(key_values, indent=2))


            # Print the extracted key-value pairs
            print(key_values["Name"])


def Symptom_based_prediction(symptoms, column_order):
    ENDPOINT_NAME = "sagemaker-scikit-learn-2023-05-10-05-22-28-258"
    runtime= boto3.client('runtime.sagemaker')
    
    one_hot_encode = lambda symptoms, column_order: [1 if col_name in symptoms else 0 for col_name in column_order]

    test_data = one_hot_encode(symptoms, column_order)
    payload=[test_data]
    print("input symptom: ", symptoms )
    print("symptoms after encoding")
    print(payload)
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                      Body=json.dumps(payload))
    print(response)
    result = json.loads(response['Body'].read().decode())
    print(result)
    return "I think the disease is "+result[0]

        

def to_serializable(val):
    if hasattr(val, '__dict__'):
        return val.__dict__
    return val
    


def processMsg(msg:str)->str:
    # msg=msg.replace("!", "")
    

    symptoms = []

    column_order = ['itching','skin rash','nodal skin eruptions','continuous sneezing','shivering','chills','joint pain','stomach pain','acidity','ulcers on tongue','muscle wasting','vomiting','burning micturition','spotting  urination','fatigue','weight gain','anxiety','cold hands and feets','mood swings','weight loss','restlessness','lethargy','patches in throat','irregular sugar level','cough','high fever','sunken eyes','breathlessness','sweating','dehydration','indigestion','headache','yellowish skin','dark urine','nausea','loss of appetite','pain behind the eyes','back pain','constipation','abdominal pain','diarrhoea','mild fever','yellow urine','yellowing of eyes','acute liver failure','fluid overload','swelling of stomach','swelled lymph nodes','malaise','blurred and distorted vision','phlegm','throat irritation','redness of eyes','sinus pressure','runny nose','congestion','chest pain','weakness in limbs','fast heart rate','pain during bowel movements','pain in anal region','bloody stool','irritation in anus','neck pain','dizziness','cramps','bruising','obesity','swollen legs','swollen blood vessels','puffy face and eyes','enlarged thyroid','brittle nails','swollen extremeties','excessive hunger','extra marital contacts','drying and tingling lips','slurred speech','knee pain','hip joint pain','muscle weakness','stiff neck','swelling joints','movement stiffness','spinning movements','loss of balance','unsteadiness','weakness of one body side','loss of smell','bladder discomfort','foul smell of urine','continuous feel of urine','passage of gases','internal itching','toxic look (typhos)','depression','irritability','muscle pain','altered sensorium','red spots over body','belly pain','abnormal menstruation','dischromic  patches','watering from eyes','increased appetite','polyuria','family history','mucoid sputum','rusty sputum','lack of concentration','visual disturbances','receiving blood transfusion','receiving unsterile injections','coma','stomach bleeding','distention of abdomen','history of alcohol consumption','fluid overload','blood in sputum','prominent veins on calf','palpitations','painful walking','pus filled pimples','blackheads','scurring','skin peeling','silver like dusting','small dents in nails','inflammatory nails','blister','red sore around nose','yellow crust ooze']

    for i in column_order:
        if i in msg:
            symptoms.append(i)
    
    if len(symptoms)!=0:
        print("symptoms:", symptoms)
        return(Symptom_based_prediction(symptoms,column_order))
    elif ".pdf" in msg:
        pdf= msg.split('+')[0]
        uid=msg.split('+')[1]

    else:
        client = boto3.client('lexv2-runtime', region_name='us-east-1')
        response = client.recognize_text(
            botId='GKPOHLYIPZ',
            botAliasId='TSTALIASID',
            localeId = 'en_US',
            sessionId ='12345',
            text = msg
        )
        print("from lex:", response)
        if 'messages' not in response:
            return "Sorry I didnt get that."
        # elif response["sessionState"]["intent"]["slots"] and 'topic' in response["sessionState"]["intent"]["slots"]:
        #     url = 'https://newsapi.org/v2/everything'
        #     params = {
        #         'q': response["sessionState"]["intent"]["slots"]['topic']["value"]["originalValue"],
        #         'sortBy': 'time',
        #         'apiKey': '4eac28bee74a481fb1273bf5b7a5a83a'
        #     }
        #     articles = requests.get(url, params=params)
        #     if articles.status_code == 200:
        #         data = response.json()
        #         count=data['totalResults']
        #         return data['articles'][0]['url']
                
        #     else:
        #         return "Couldn't fetch articles"
        else:
            return response['messages'][0]['content']


    


    # if response["sessionState"]["intent"]["slots"]:
    #     print("symptoms in msg")
    #     for i in response["sessionState"]["intent"]["slots"]:
    #         if response["sessionState"]["intent"]["slots"][i]:
    #             symptoms.append(response["sessionState"]["intent"]["slots"][i]["value"]["originalValue"])
        
    #     print("from lex:", symptoms)
    #     return(Symptom_based_prediction(symptoms))
    # else:
    #     print(response['messages'][0]['content'])
    #     return response['messages'][0]['content']