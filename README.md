## Structure du Projet

```
.
├── front/         # Application Angular (Frontend)
└── back-end/      # Application Node.js (Backend)
```

## Installation Rapide

### Installation et Démarrage en Une Commande

```bash
# Installation initiale (à faire une seule fois)
npm install        # Installer concurrently
npm run install-all   # Installer les dépendances du front et du back

# Démarrer l'application complète (front + back)
npm run dev
```


## API Documentation

### Endpoints Backend

#### Authentification

- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/register` - Inscription utilisateur

#### Gestion des Playlists

- `GET /api/playlists` - Récupérer toutes les playlists
- `POST /api/playlists` - Créer une nouvelle playlist
- `GET /api/playlists/:id` - Récupérer une playlist spécifique
- `PUT /api/playlists/:id` - Modifier une playlist
- `DELETE /api/playlists/:id` - Supprimer une playlist

#### Gestion des Morceaux

- `GET /api/tracks` - Récupérer tous les morceaux
- `POST /api/tracks` - Ajouter un nouveau morceau
- `GET /api/tracks/:id` - Récupérer un morceau spécifique
- `PUT /api/tracks/:id` - Modifier un morceau
- `DELETE /api/tracks/:id` - Supprimer un morceau

## Technologies Utilisées

### Backend

- Node.js
- Express.js
- MongoDB
- TypeScript
- JWT pour l'authentification

### Frontend

- Angular 18.2.6
- Angular Material
- TypeScript
- RxJS

## Développement

### Backend

- Tests : `npm test`
- Lint : `npm run lint`
- Build : `npm run build`

### Frontend

- Tests : `ng test`
- Lint : `ng lint`
- Build : `ng build`

