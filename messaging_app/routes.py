from flask import render_template
from messaging_app import app
from messaging_app.controllers import messages

@app.route('/')
def root():
    return render_template('index.html')
