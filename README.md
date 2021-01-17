# projet-aemt

# Deployment

Les projets peuvent se déployer sur payara

## Backend

Ajouter le projet backend au serveur payara
Eclipse:
Clic droit => Export => WAR File

## Frontend

Il faut aller dans le dossier "frontend" et faire la commande dans un terminal

```bash
npm install
mvn package
```

On peut ensuite récupérer le fichier WAR, qui pourra etre déployé sur le serveur Payara

# Developpement

## Backend

Créer un utilisateur "gb3" avec comme mot de passe "4856"
```
CREATE USER 'gb3@'localhost' IDENTIFIED BY '4856';
GRANT ALL PRIVILEGES ON *.* TO 'gb3'@'localhost';
```

Créer la base de donnée "dbb3" grace à la commande
```
CREATE DATABASE DBB3;
```
Clic droit sur "MainInit", puis "Run as" => Java Application

Ajouter le projet backend au serveur payara
## Frontend

Il faut aller dans le dossier "frontend" et faire la commande dans un terminal

```bash
npm install
npm start
```
