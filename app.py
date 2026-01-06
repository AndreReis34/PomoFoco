from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contatos')
def contatos():
    return render_template('contatos.html')

@app.route('/<username>')
def profile(username):
    return render_template('username.html', username=username)

if __name__ == '__main__':
    app.run(debug=True)