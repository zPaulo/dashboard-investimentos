from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Carrega os dados JSON gerados pelo script de processamento
with open('consolidated_data.json', 'r') as f:
    consolidated_data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_data', methods=['GET'])
def load_data():
    return jsonify(consolidated_data)

if __name__ == '__main__':
    app.run(debug=True)
