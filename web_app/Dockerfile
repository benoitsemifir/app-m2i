FROM nginx:1.19.0
COPY src /etc/nginx/html
COPY assets /etc/nginx/html/assets
RUN rm /etc/nginx/conf.d/default.conf
# COPY conf/nginx.dev.conf /etc/nginx/conf.d
COPY conf/nginx.prod.conf /etc/nginx/conf.d
COPY ./conf/installer.sh /tmp/installer.sh
COPY conf/cert.pem /etc/ssl/certs/nginx-selfsigned.crt
COPY conf/key.pem /etc/ssl/private/nginx-selfsigned.key
RUN /tmp/installer.sh
RUN rm -R /tmp/installer.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]