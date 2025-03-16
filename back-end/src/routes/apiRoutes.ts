import utilisateurRouter from './utilisateur.router';
import listesRouter from './listes.router';
import chansonRouter from './chanson.router';

const apiRoutes = [
    {
        path: 'utilisateur',
        router: utilisateurRouter
    },
    {
        path:"liste",
        router: listesRouter
    },
    {
        path:"chansons",
        router: chansonRouter
    },
];

export default apiRoutes;

