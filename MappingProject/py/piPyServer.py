from flask import Flask, jsonify, render_template, request
from flask.ext.socketio import SocketIO, emit
import RPi.GPIO as GPIO
from time import sleep

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
pinDict = {'w' : 25, 'a' : 24, 's' : 24, 'd' : 22}
actDict = {'down' : 1, 'up' : 0}
           
@app.route("/hitme", methods = ["POST"])   
def hitme():
    if request.method == "POST":
        instructions = request.json['payload']
        for k in instructions:
            setGPIOpin(k, instructions[k])  
    return ""


@app.route("/")
def index():
    return render_template('template.htm')

def setGPIOpin(instruct, value):
    print(str(pinDict[instruct]) + " set to " + str(1 if value else 0))
    GPIO.output(pinDict[instruct], 1 if value else 0)

@socketio.on('connect', namespace='/hitmesock')
def hitme_connect():
    emit('response', {'data' : 'Connected'})

@socketio.on('disconnect', namespace='/hitmesock')
def hitme_disconnect():
    print('Client disconnected')

if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM)
    for i in pinDict.values():
        print("registering GPIO number " + str(i))
        GPIO.setup(i, GPIO.OUT)
        GPIO.output(i, 0)
    app.debug = True
    #app.run('0.0.0.0', 5001)    
    socketio.run(app, '0.0.0.0', 5001)

