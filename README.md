# 🚀 MiniApp Leaflet - Installation rapide

---

## 📦 Pré-requis

### 🔧 Backend
- Java **17+**
- Maven installé  
```bash
mvn -v
```
- PostgreSQL installé
- PostGIS activé

---

### 🌐 Frontend
- Node.js **>= 18**
- Angular CLI installé  
```bash
npm install -g @angular/cli
```

---

## 🗄️ Base de données

### ✅ Créer la base

```sql
CREATE DATABASE miniapp_leaflet;

\c miniapp_leaflet;

CREATE EXTENSION postgis;
```

---

### ✅ Importer les tables

```bash
psql -U postgres -d miniapp_leaflet -f script.sql
```

👉 Le fichier `script.sql` doit contenir :
- la création des tables
- des données de test

---

## ⚙️ Backend (Spring Boot)

### ✅ Configuration

Modifier uniquement ces 3 lignes dans le fichier `application.properties` :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/VOTRE_NOM_BDD
spring.datasource.username=VOTRE_USERNAME
spring.datasource.password=VOTRE_PASSWORD
```
---

### ▶️ Lancer le backend

```bash
mvn clean install
mvn spring-boot:run
```

👉 Backend disponible sur :  
http://localhost:8080

---

## ⚙️ Frontend (Angular)

### ✅ Installer dépendances

```bash
npm install
```

---

### ▶️ Lancer l'application

```bash
ng serve
```

👉 Frontend disponible sur :  
http://localhost:4200

---

✅ L'application est prête !