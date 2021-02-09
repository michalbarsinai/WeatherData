import ast
import config
import json
import requests
from datetime import datetime
from flask import Flask

app = Flask(__name__)

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