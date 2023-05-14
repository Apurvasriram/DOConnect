import json
import math
import dateutil.parser
import datetime
import time
import os
import logging
import boto3
import requests

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)



def validate_order(slots):

    topic = slots['topic']

    if topic is not None :
        return {
                'isValid': False,
                'invalidSlot': 'topic',
                'message': 'Please give a valid topic'
            }

    return {'isValid': True}


def lambda_handler(event, context):
    print(event)

    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    logger.debug('event.bot.name={}'.format(event['bot']['name']))

    bot = event['bot']['name']
    intent = event['sessionState']['intent']['name']
    slots = event['sessionState']['intent']['slots']
    print(bot)
    print(slots)
    topic=slots["topic"]


    # order_validation_result = validate_order(slots)

    if event['invocationSource'] == 'DialogCodeHook':
        response = {
            "sessionState": {
                "dialogAction": {
                    "type": "Delegate"
                },
                "intent": {
                    'name': intent,
                    'slots': slots
                }
            }
        }

    if event['invocationSource'] == 'FulfillmentCodeHook':

        
        
        # print('The message id for the response msg is {}'.format(response['MessageId']))
        url = 'https://newsapi.org/v2/everything'
        params = {
            'q': topic,
            'sortBy': 'time',
            'apiKey': '4eac28bee74a481fb1273bf5b7a5a83a'
        }
        articles = requests.get(url, params=params)
        if articles.status_code == 200:
            data = response.json()
            count=data['totalResults']
            msg = data['articles'][0]['url']
            
        else:
            msg= "Couldn't fetch articles"
        response = {
            "sessionState": {
                "dialogAction": {
                    "type": "Close"
                },
                "intent": {
                    "name": intent,
                    "slots": slots,
                    "state": "Fulfilled"
                }

            },
            "messages": [
                {
                    "contentType": "PlainText",
                    "content": msg
                }
            ]
        }

    print(response)
    return response