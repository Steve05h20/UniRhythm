## Comment lancer le serveur

Pour lancer le serveur, suivez les étapes ci-dessous :

1. Assurez-vous d'avoir Node.js et npm installés sur votre machine.
2. Clonez le dépôt et naviguez dans le répertoire du projet.
3. Installez les dépendances en exécutant la commande suivante :
   ```bash
   npm install
   ```
4. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires :
   ```env
   PORT=4000
   MONGODB_URI=mongodb+srv://steve05h2o:OerUGrYQLYzlTFU2@cluster0.lpbbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
5. Lancez le serveur en mode développement avec la commande suivante :
   ```bash
   npm run dev
   ```
6. Le serveur devrait maintenant être en cours d'exécution sur [http://localhost:4000](http://localhost:4000).

Vous pouvez maintenant accéder à l'API et commencer à l'utiliser.

## Endpoints de l'API

### Utilisateur

- `GET /api/utilisateur` : Afficher tous les utilisateurs
- `GET /api/utilisateur/:id` : Afficher un utilisateur par ID
- `POST /api/utilisateur` : Créer un nouvel utilisateur
- `PUT /api/utilisateur/:id` : Modifier un utilisateur par ID
- `DELETE /api/utilisateur/:id` : Supprimer un utilisateur par ID

### Listes

- `GET /api/liste/public` : Afficher toutes les listes publiques
- `GET /api/liste/utilisateur/:id` : Afficher toutes les listes d'un utilisateur par ID
- `GET /api/liste` : Afficher toutes les listes
- `GET /api/liste/:id` : Afficher une liste par ID
- `POST /api/liste/utilisateur` : Associer une liste à un utilisateur
- `POST /api/liste` : Ajouter une nouvelle liste
- `PUT /api/liste/:id` : Modifier une liste par ID
- `DELETE /api/liste/:id` : Supprimer une liste par ID
- `POST /api/liste/chanson` : Associer une chanson à une liste

### Chansons

- `GET /api/chansons/liste/:id` : Afficher les chansons d'une liste par ID
- `GET /api/chansons` : Afficher toutes les chansons
- `GET /api/chansons/:id` : Afficher une chanson par ID
- `GET /api/chansons/artiste/:name` : Afficher les chansons d'un artiste par nom
- `PUT /api/chansons/nblecture/:id` : Modifier le nombre de lectures d'une chanson par ID
- `POST /api/chansons` : Ajouter une nouvelle chanson
- `DELETE /api/chansons/:id` : Supprimer une chanson par ID
- `PUT /api/chansons/:id` : Modifier une chanson par ID
