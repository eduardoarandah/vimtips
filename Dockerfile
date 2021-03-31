FROM python:3.10.0a6-buster

RUN pip install python-telegram-bot

RUN mkdir /app
ADD . /app
WORKDIR /app

CMD python /app/bot.py

