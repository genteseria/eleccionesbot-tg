FROM node:bullseye

#Estableciendo directorio de trabajo
WORKDIR /usr/src/app

#Copiando información de dependencias
COPY package*.json ./

#Instalando dependencias
RUN npm install

#Estableciendo variable de entorno del token
ENV ELECCIONESBOT_TOKEN=su-token-va-aquí

#Copiando código de la app
COPY bot.js ./

#Ejecutando código de la app
CMD ["node", "bot.js"]