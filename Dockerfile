# Utilizar una imagen de Node.js como base
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY package*.json ./
COPY server.js ./

# Instalar las dependencias del proyecto
RUN npm install

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD [ "node", "server.js" ]
