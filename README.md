# 🚀 Mini-App Leaflet - Guide d'installation

---


## Fonctionnalités principales de l'application

L'application **Mini-App Leaflet** permet de :

- afficher une carte interactive grâce à Leaflet
- visualiser des données géographiques issues de couches QGIS 
- consulter des zones spécifiques
- ajouter des points avec une description 
- filtrer les points affichés selon leur description
- créer un compte utilisateur

Elle permet ainsi d’explorer et enrichir des données géographiques de manière simple et interactive.


*Note : La fonctionalité de connexion à un compte n'est pas encore terminé.*


---


## Configuration necéssaire pour l'API backend


### Technologies à installé
- Java **17+** (langage de programmation)
- PostgreSQL (base de données relationnelle)
- PgAdmin4 (outil d’administration PostgreSQL)
- Maven (outil de compilation et de gestion des dépendances pour le backend)


### Création de la base de données
- Ouvrez le logiciel PgAdmin4
- Connectez vous à votre compte PostgreSQL
- Dans le menu tout en haut, cliquez sur l'onglet Tools puis Query tool
- Puis cliquez sur le bouton Open File (Ctrl + O), qui se trouve en haut à gauche de la console SQL
- Puis selectionnez le fichier Bdd_app_leaflet.sql qui se trouve dans : Mini-app-leaflet/Base de données PostgreSQL/Bdd_app_leaflet.sql
- Puis pour terminer, cliquez sur le bouton *Execute script* (F5).


**Resultat attendu**
- Base de donnée bdd_mini_app_leaflet créé
- Extension PostGIS activé dedans
- Création de toutes les tables avec leurs données
- Dont notamment un compte User de test créé dans le schéma *public* dans la table *user* avec :
    - email : test.test@test.com
    - mot de passe : Test


### Modification du fichier `application.properties` :
Dans le fichier `application.properties` dans `Mini-app-leaflet/Backend Java/src/main/resources/application.properties`, modifier uniquement ces 2 lignes :

spring.datasource.username=VOTRE_USERNAME_POSTGRESQL
spring.datasource.password=VOTRE_PASSWORD_POSTGRESQL

### Installer les dépendances pour cette application backend java
Dans votre terminal, dans le dossier `Mini-app-leaflet/Backend Java`, executez cette commande :

```bash
mvn clean install
```

### Lancer l'application backend

Puis dans ce même dossier, executez cette commande :

```bash
mvn spring-boot:run
```

### Résultat attendu

L'API backend est à présent disponible sur : http://localhost:8080


---


## Configuration necéssaire pour l'application frontend Angular


### Technologies à installé pour le frontend
- Node.js **>= 18**
- Angular CLI


### Installer les dépendances pour cette application Angular
Dans votre terminal, dans le dossier `Mini-app-leaflet/Frontend Angular`, executez cette commande :

```bash
npm install
```

### Lancer l'application frontend
Puis dans ce même dossier, executez cette commande :

```bash
ng serve
```

L'application frontend est à présent disponible sur `http://localhost:4200`


---


**L'application est à présent prête à être utiliser ! Félicitations !**