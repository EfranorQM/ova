# Etapa base
FROM node:16-alpine as base

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "start"]
