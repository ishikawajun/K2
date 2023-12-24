FROM nginx:latest

RUN apt update
RUN apt -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
RUN apt install -y vim

RUN mkdir /app
COPY /app /app
COPY nginx.conf /etc/nginx/nginx.conf