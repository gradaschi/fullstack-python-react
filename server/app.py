from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS

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

@socketio.on('connect')
def handle_connect():
    emit('connected', {'status': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    emit('disconnected', {'status': 'Disconnected'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
