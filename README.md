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

Ajouter le projet backend au serveur payara

## Frontend

Il faut aller dans le dossier "frontend" et faire la commande dans un terminal

```bash
npm install
npm start
```
