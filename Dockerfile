# Usa una imagen ligera de Nginx
FROM nginx:alpine

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia TODO el contenido de src a la raíz de Nginx
COPY src/ /usr/share/nginx/html/

# Copia otras carpetas importantes que están fuera de src
COPY public/ /usr/share/nginx/html/public/
COPY data/ /usr/share/nginx/html/data/
COPY scripts/ /usr/share/nginx/html/scripts/

# Expone el puerto 80
EXPOSE 80