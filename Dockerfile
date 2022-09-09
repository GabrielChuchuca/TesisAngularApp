FROM nginx:alpine

#RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf

#COPY ./nginx.conf /etc/nginx/nginx.conf

COPY ./dist/tesis-interfaz /usr/share/nginx/html

EXPOSE 80