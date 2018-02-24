# Messaging App
Basic messaging app using Flask & ReactJs

# Setup backend

1. Clone the repo
2. Install python 2 & pip on your machine
3. `python setup.py` (Give sudo permissions if required)
4. cd messaging-app & `pip install -e .`
5. `export FLASK_APP='messaging-app'`
6. `flask run`
7. Visit `http://127.0.0.1/` to get started

# Setup frontend

1. Install npm
2. Run `npm install` at root of directory
3. `npm start` to compile the .css files or alternatively `grunt sass` if you have global grunt

# Tech Stack

Tech stack used is Flask, Sqlite3, ReactJs & Jquery

# Tech Structure

1. The whole app resides in folder `messaging_app`
2. `controllers` folder contain the logic to handle the route for its resource i.e messages
3. `db` folder has SqliteHelper to help interact with the database
4. `static` contains `javascript` & `stylesheets`
5. `templates` will only have index.html the entry point for loading our frontend app

# Pending things

1. Currently all jsx components code resides in index.js due to less time.
2. No unit test cases written yet for sqlite helper & controller

# Contribute

Just fork repo & open a pull request