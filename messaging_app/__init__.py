from flask import Flask
app = Flask(__name__)

import messaging_app.routes
import messaging_app.db.sqlite_helper as sqlite_helper

sqlite = sqlite_helper.SqliteHelper()

# Should be a part of migration but keeping it here for now
sqlite.execute(
'''
	CREATE TABLE IF NOT EXISTS messages (
		content text,
		user_id integer,
		m_time timestamp
	);
''')

#Load dummy messages
sqlite.execute('DELETE from messages')
sqlite.execute(
'''
	INSERT INTO messages(content, user_id, m_time) VALUES('Hey this is the first message', 1, 1519463205);
''')
sqlite.close()