FROM ruby:2.3.5

RUN apt update
RUN yes | apt install nodejs
