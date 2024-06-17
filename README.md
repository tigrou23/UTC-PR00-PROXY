# UTC-PR00-PROXY
⚠️ Annexe du projet [UTC-PR00](https://https://github.com/tigrou23/UTC-PR00) ⚠️
___
Lien vers le site : [https://pr00.hugopereira.fr](https://pr00.hugopereira.fr).
___

## Explication du projet

### 1. Objectif

Le but de ce projet est de créer un proxy qui va permettre de faire des requêtes des utilisateurs du site à des APIs. Il est donc nécessaire de passer par un proxy pour pouvoir les utiliser. Le proxy va rediriger les requêtes vers les APIs cibles et renvoyer les réponses aux utilisateurs. Ce proxy a été mis en place pour rajouter une couche de sécurité supplémentaire. En effet, les requêtes sont faites en HTTPS et les réponses sont vérifiées avant d'être renvoyées aux utilisateurs. De plus, chaque requête alimente une base de données qui permet de suivre l'utilisation des utilisateurs (cf. [UTC-PR00-STREAMLIT](https://github.com/tigrou23/UTC-PR00-STREAMLIT)).

### 2. Fonctionnement

Le proxy est un serveur Node.js qui va écouter sur un port donné. Il va recevoir des requêtes HTTP et les rediriger vers les APIs cibles. Les réponses des APIs cibles seront renvoyées au client. La communication avec le client se fait en HTTPS. 

### 3. Sécurité

Le proxy est sécurisé grâce à un certificat SSL fourni par [Let's Encrypt](https://letsencrypt.org/). Les requêtes sont faites en HTTPS pour garantir la confidentialité des données. De plus, les réponses des APIs cibles sont vérifiées avant d'être renvoyées aux utilisateurs. De plus, un ORM est utilisé pour éviter les injections SQL (Sequelize).

### 4. Technologies utilisées

- Node.js
- Express.js
- Axios
- Let's Encrypt
- Certbot
- Apache2

### 5. Base de données

Les requêtes des utilisateurs sont stockées dans une base de données MySQL. Cette base de données est utilisée pour suivre l'utilisation des APIs et pour des statistiques.

## Installation

### 1. Installation de Node.js

Pour installer Node.js, il suffit de suivre les instructions sur le site officiel : [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

### 2. Installation du proxy

Pour installer le proxy, il suffit de cloner le dépôt Git et d'installer les dépendances :

```bash
cd UTC-PR00-PROXY
npm install
```

### 3. Configuration

Nous devons faire un service qui va lancer le serveur Node.js au démarrage du serveur. Pour cela, nous allons créer un fichier de service pour systemd.

```bash
sudo nano /etc/systemd/system/nodeapp.service
```

```bash
[Unit]
Description=Node.js Application
After=network.target

[Service]
ExecStart=/usr/bin/node /root/UTC-PR00-PROXY/server.js
WorkingDirectory=/root/UTC-PR00-PROXY
Restart=always
User=root
Group=root
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

### 4. Démarrage du service

Mettre à jour avec le nouveau service

```bash
sudo systemctl daemon-reload
```

Démarrer le service

```bash
sudo systemctl start nodeapp
```

Activer au démarrage

```bash
sudo systemctl enable nodeapp
```