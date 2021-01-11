FROM node:12

WORKDIR /app/frontend

COPY frontend/package.json /app/frontend
RUN npm install -g @angular/cli && npm install

COPY frontend /app/frontend
CMD ["npm", "start"]