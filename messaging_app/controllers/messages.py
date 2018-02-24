import time
from flask import jsonify
from flask import request
from messaging_app import app
import messaging_app.db.sqlite_helper as sqlite_helper

@app.route('/messages')
def get_messages():
    sqlite = sqlite_helper.SqliteHelper()
    sqlite.execute('SELECT * from messages')
    rows = sqlite.fetch_rows()
    sqlite.close()
    result = []
    for row in rows:
    	result.append({ 'content': row['content'], 'time': row['m_time'], 'userId': row['user_id']})
    return jsonify(result)


@app.route('/messages', methods=['POST'])
def add_message():
	message_content = request.values.get('content')
	messsage_user_id = request.values.get('user_id')
	message_time = int(time.time())
	sqlite = sqlite_helper.SqliteHelper()

	# Add message to database
	sqlite.execute('''
		INSERT INTO messages(content, user_id, m_time)
		VALUES (?, ?, ?)
	''', (message_content, messsage_user_id, message_time))

	sqlite.close()

	return jsonify({})
