apt-get update && apt-get install apache2-utils -y
# on ajoute un certificat ssl
# openssl req -x509 -nodes -days 365 -subj '/C=FR/ST=Chnord/L=Lille/CN=www.monsupersite.com' \
#     -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

# on crée un groupe Diffie-Hellman pour augmenter le niveau de sécurité
openssl dhparam -out /etc/nginx/dhparam.pem 1024

# on rajoute des pointeurs pour récupérer la clé SSL et le certificat
mkdir /etc/nginx/snippets
touch /etc/nginx/snippets/self-signed.conf
echo "ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;" >>/etc/nginx/snippets/self-signed.conf
echo "ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;" >>/etc/nginx/snippets/self-signed.conf

#
touch /etc/nginx/snippets/ssl-params.conf
echo "ssl_protocols TLSv1.2;" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_prefer_server_ciphers on;" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_dhparam /etc/nginx/dhparam.pem;" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_ecdh_curve secp384r1; # Requires nginx >= 1.1.0" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_session_timeout  10m;" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_session_cache shared:SSL:10m;" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_session_tickets off; # Requires nginx >= 1.5.9" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_stapling on; # Requires nginx >= 1.3.7" >>/etc/nginx/snippets/ssl-params.conf
echo "ssl_stapling_verify on; # Requires nginx => 1.3.7" >>/etc/nginx/snippets/ssl-params.conf
echo "resolver 8.8.8.8 8.8.4.4 valid=300s;" >>/etc/nginx/snippets/ssl-params.conf
echo "resolver_timeout 5s;" >>/etc/nginx/snippets/ssl-params.conf
# Disable strict transport security for now. You can uncomment the following
# line if you understand the implications.
# echo "add_header Strict-Transport-Security 'max-age=63072000; includeSubDomains; preload'";  >> /etc/nginx/snippets/ssl-params.conf;
echo "add_header X-Frame-Options DENY;" >>/etc/nginx/snippets/ssl-params.conf
echo "add_header X-Content-Type-Options nosniff;" >>/etc/nginx/snippets/ssl-params.conf
echo "add_header X-XSS-Protection '1; mode=block';" >>/etc/nginx/snippets/ssl-params.conf
