import ast
import config
import json
import requests
from datetime import datetime
from elasticsearch import Elasticsearch
from flask import Flask
from flask import request

app = Flask(__name__)
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

# doc = {
#     'author': 'kimchy',
#     'text': 'Elasticsearch: cool. bonsai cool.',
#     'timestamp': datetime.now(),
# }
# res = es.index(index="test-index", id=1, body=doc)
# # print(res['result'])
# %(city)s has %(balance)s$ in their account!
# res = es.get(index="bank", id=1)
# print(res['_source'])

# es.indices.refresh(index="bank")

# res = es.search(index="bank", body={"query": {"match_all": {}}, "sort": {"account_number": "asc"}})
# print("Got %d Hits:" % res['hits']['total']['value'])
# for hit in res['hits']['hits']:
#     print("%(firstname)s from %(city)s has %(balance)s$ in their account" % hit["_source"])

@app.route('/weather/<city>/<data_type>')
def get_weather_data(city, data_type):
    res = requests.get(f'http://api.weatherapi.com/v1/forecast.json?key={config.api_key}&q={city}&days=3').content
    dict_str_res = res.decode("UTF-8")
    if data_type == "current":
        current_dict_res = ast.literal_eval(dict_str_res)["current"]
        return {k: v for (k, v) in current_dict_res.items() if k in ["feelslike_c", "temp_c"]}

    days_list_res = ast.literal_eval(dict_str_res)["forecast"]["forecastday"]
    forecast_dict_res = {
        n: {
            "name": (datetime.fromtimestamp(day_dict["date_epoch"])).strftime("%d %b"),
            "min": day_dict["day"]["mintemp_c"],
            "avg": day_dict["day"]["avgtemp_c"],
            "max": day_dict["day"]["maxtemp_c"]
            }
        for n, day_dict in enumerate(days_list_res)
    }
    return forecast_dict_res


@app.route('/comments', methods=['POST', 'GET'])
def handle_comment_req():
    if request.method == 'POST':
        res = es.index(index="weather-comments", body=request.json)
        return res
    search_body = {
        "query": {
            "match_all": {}
            },
            "size": 10,
            "sort": [
                {
                "timeStamp": {
                    "order": "desc"
                }
            }]
        }
    
    res = es.search(index='weather-comments', body=search_body)
    return res


# 1. post comment to comments index (body is request.json)
# # 
# # print(res['result'])

# 2. 