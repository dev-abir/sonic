# sonic_server

This is the sonic's server part. It will be run on one machine in a lab. The primary purpose of this server is to record the participants' details, their code and results. Most of the backend / server part is done...

> It is a part of the sonic application (superfast online judging system). This app is recommended for use in a controlled lab environment.

## Setps to run

-   You should know (or learn) the basics of python and pip.
-   Setup a virtual environment (like venv) (optional).
-   Use `pip install -r requirements.txt` to install the dependencies.
-   You should create a super user, then do `python manage.py runserver`. While running, if it gives an error, asking for a `media` directory, then you should create one in the root directory of `sonic_server`.
-   Go to http://localhost:8000/api/ to explore the api endpoints, create multiple users, group etc...

**For production, create a new `SECRET_KEY` using the strategy given in `settings.py` (near `SECRET_KEY` setting), put `SECRET_KEY=<generated_sec_key>` in a `.env` file, and of course change `debug=True` to `debug=False` in `settings.py`.**
