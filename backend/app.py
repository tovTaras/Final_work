import time
import serial
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

DB_URI = "mysql+pymysql://root:Moskit2805@localhost/kursach_db"
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
arduino_serial = serial.Serial("COM2", 9600, timeout=1)
list_of_commands = []


class Commands(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    commands = db.Column(db.String(255), nullable=False)

    def __init__(self, commands):
        self.commands = commands

    def __repr__(self):
        return f"id: {self.id}, commands: {self.commands}"


class CommandsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'commands')


commands_schema = CommandsSchema()


@app.route("/receiver", methods=["POST"])
def post_me():
    data = request.get_json()
    if data.isnumeric():
        get_algorithm_from_db(int(data))
    if len(list_of_commands) <= 0 and data != ("start_algo" or "activate_algo"):
        send_command(data)
    if data == "start_algo":
        list_of_commands.append(data)
    elif data == "delete_start_algo":
        list_of_commands.clear()
    elif "start_algo" in list_of_commands and data != "activate_algo" and "activate_algo" not in list_of_commands:
        list_of_commands.append(data)
    elif data == "activate_algo":
        db.session.add(Commands(', '.join(list_of_commands)))
        db.session.commit()
        send_list_of_commands(list_of_commands)

    print(f"Command: {data}, List: {list_of_commands}")
    return 'Success', 200


@app.route("/receiver", methods=['GET'])
def get_algorithm():
    all_algorithms = Commands.query.all()
    result = []
    for i in all_algorithms:
        data = commands_schema.dump(i)
        result.append(data)
    return jsonify(result)


def get_algorithm_from_db(id):
    command = Commands.query.get(id)
    list_of_commands_id = command.commands.split(", ")
    list_of_commands_id.append("off_all")
    send_list_of_commands(list_of_commands_id)


def send_list_of_commands(commands):
    for command in commands:
        print(command)
        send_command(command)
        time.sleep(3)
    list_of_commands.clear()


def send_command(command):
    arduino_serial.write(command.encode())


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True, use_reloader=False)
