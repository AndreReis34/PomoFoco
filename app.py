from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///pomodoro.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class RegistroPomodoro(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10), nullable=False)   # YYYY-MM-DD
    hora = db.Column(db.String(5), nullable=False)    # HH:MM
    minutos = db.Column(db.Integer, nullable=False)

@app.before_request
def criar_banco():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/salvarDB', methods=["POST"])
def registro():
    data = request.json

    registro = RegistroPomodoro(
        data=data["data"],
        hora=data["hora"],
        minutos=data["minutos"]
    )

    db.session.add(registro)
    db.session.commit()

    return jsonify({"status": "ok"}), 201

@app.route('/carregarDB', methods=["GET"])
def historico():
    registros = RegistroPomodoro.query.all()

    resultado = {}

    for r in registros:
        if r.data not in resultado:
            resultado[r.data] = {
                "totalMinutos": 0,
                "registros": []
            }

        resultado[r.data]["totalMinutos"] += r.minutos
        resultado[r.data]["registros"].append({
            "hora": r.hora,
            "minutos": r.minutos
        })

    return jsonify(resultado)

@app.route('/history')
def history():
    return render_template("history.html")

if __name__ == '__main__':
    app.run(debug=True)