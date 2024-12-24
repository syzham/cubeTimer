import subprocess
from flask import Flask, request, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@app.route('/solve', methods=['POST'])
def run_command():
    data = request.json
    facelet = data.get('facelet', '')
    solvedState = data.get('solved', 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB')

    # Example: Return the received command as a response
    # Replace this with actual command execution logic
    if facelet:
        if facelet == solvedState:
            return ''
        moves = subprocess.run(['kociemba', facelet], capture_output=True)
        return moves.stdout.decode()
    return '', 400

if __name__ == '__main__':
    app.run(debug=True)