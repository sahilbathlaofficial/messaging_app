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