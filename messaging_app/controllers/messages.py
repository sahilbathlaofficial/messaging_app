import messaging_app.db.sqlite_helper as sqlite_helper
import time

from flask import jsonify
from messaging_app import app

@app.route('/messages')
def get_messages():
    sqlite = sqlite_helper.SqliteHelper()
    sqlite.execute('SELECT * from messages')
    rows = sqlite.fetch_rows()
    return jsonify(rows)


@app.route('/messages', methods=['POST'])
def add_message():
	message_content = flask.request.values.get('content')
	messsage_user_id = flask.request.values.get('user_id')
	message_time = int(time.time())

	# Add message to database
	sqlite.execute('''
		INSERT INTO messages(content, user_id, m_time)
		VALUES (?, ?, ?)
	''', (message_content, messsage_user_id, message_time))
