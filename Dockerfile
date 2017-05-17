FROM ruby:2.3.3

RUN apt update
RUN yes | apt install nodejs
