from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import requests

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

class TaskRunner:
    logs = {}

    def start(self, parameters):
        socketio.emit('log', {'message': f"Parameters: {parameters}"}, namespace='/')
        for i in range(10):
            log_message = f"Task in progress: {i}"
            self.logs[i] = log_message
            socketio.emit('log', {'message': log_message}, namespace='/')
            socketio.sleep(0.3)

@app.route('/start', methods=['POST'])
def start_task():
    task_runner = TaskRunner()
    parameters = request.json
    task_runner.start(parameters)
    socketio.emit('log', {'message': 'Task finished'}, namespace='/')
    return jsonify({'status': 'Task started'})

@socketio.on('fetch_spot_rates')
def fetch_spot_rates(data):
    url = "https://exchange-rates-api.oanda.com/v2/rates/spot.json"
    base_currencies = data['base']
    quote_currencies = data['quote']

    params = {
        "base": base_currencies,
        "quote": quote_currencies,
    }

    headers = {
        "Authorization": "Bearer lYJix9SEXDkeremrhIuHsxEl", 
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response_json = response.json()

        if "quotes" in response_json:
            quotes = response_json["quotes"]
            spot_rates = []
            for quote in quotes:
                base_currency = quote["base_currency"]
                quote_currency = quote["quote_currency"]
                bid = quote["bid"]
                ask = quote["ask"]
                midpoint = quote["midpoint"]

                spot_rates.append({
                    "base_currency": base_currency,
                    "quote_currency": quote_currency,
                    "bid": bid,
                    "ask": ask,
                    "midpoint": midpoint,
                })

            emit('spot_rates', {'spot_rates': spot_rates})
        else:
            emit('error', {'error': 'No spot rates found in the response.'})

    except requests.exceptions.RequestException as e:
        emit('error', {'error': str(e)})

@socketio.on('connect')
def handle_connect():
    emit('connected', {'status': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    emit('disconnected', {'status': 'Disconnected'})

if __name__ == '__main__':
    socketio.run(app, debug=True)