from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for your app
socketio = SocketIO(app, cors_allowed_origins="*")  # Add cors_allowed_origins parameter

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
    return jsonify({'status': 'Task started'})

@socketio.on('connect')
def handle_connect():
    emit('connected', {'status': 'Connected'}, namespace='/')  # Pass the 'namespace' argument

@socketio.on('disconnect')
def handle_disconnect():
    emit('disconnected', {'status': 'Disconnected'}, namespace='/')  # Pass the 'namespace' argument

if __name__ == '__main__':
    socketio.run(app, debug=True)  # Add debug=True parameter
