import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiRoutes';
import cors from 'cors';


interface ApiRoute {
    path: string;
    router: express.Router;
}

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Pour parser les requêtes avec données

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('MONGODB_URI n\'est pas défini dans le fichier .env');
    process.exit(1);
}

// Connexion à MongoDB
mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connecté à MongoDB');
    })
    .catch((error: Error) => {
        console.error('Erreur de connexion à MongoDB:', error);
        process.exit(1);
    });

// Routes de base
app.get('/', (_req: Request, res: Response) => {
    res.send('API TypeScript fonctionnelle !');
});
apiRoutes.forEach((route: ApiRoute) => {
    app.use(`/api/${route.path}`, route.router);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
}

export default app;