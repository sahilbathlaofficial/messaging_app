import sqlite3

class SqliteHelper:
	def __init__(self):
		# Hardcoded database name but should be ideally part of a config file
		self.connection = sqlite3.connect('messaging-app.db')
		self.connection.row_factory = sqlite3.Row
		self.cursor = self.connection.cursor()

	def execute(self, query, params=()):
		self.cursor.execute(query, params)
		self.connection.commit()

	def fetch_rows(self):
		return self.cursor.fetchall()

	def close(self):
		self.connection.close()