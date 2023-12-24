FROM node

USER root

RUN apt update
RUN apt -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
RUN apt install -y vim

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

WORKDIR /app/src