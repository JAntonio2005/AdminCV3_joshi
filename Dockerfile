
# Usa la imagen oficial de Apache
FROM httpd:latest

# Borra el contenido actual del htdocs
RUN rm -rf /usr/local/apache2/htdocs/*

# Copia los archivos de Angular al contenedor
COPY dist/admin-cv/browser/ /usr/local/apache2/htdocs/

# Expone el puerto 80 (por si lo usas fuera del workflow)
EXPOSE 80
