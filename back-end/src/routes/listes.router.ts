import { Router } from 'express';
import { AFFICHER_LISTE_PUBLIQUE, AFFICHER_TOUS_LISTES, AFFICHER_UNE_LISTE, AJOUTER_UNE_LISTE, MODIFIER_UNE_LISTE, SUPPRIMER_UNE_LISTE } from '../controllers/listes.controller';
import { ASSOCIER_LISTE_CHANSON } from '../controllers/listes_chanson.controller';
import { AFFICHER_LiSTE_UTILISATEUR_ID, ASSOCIER_LISTE_UTILISATEUR } from '../controllers/listes_utilisateurs.controller';


const listesRouter: Router = Router();

//1. Affichage de la liste des listes publiques 
listesRouter.get("/public", AFFICHER_LISTE_PUBLIQUE);

//3. afficher une liste en particulier (selon son identifiant)
listesRouter.get("/:id", AFFICHER_UNE_LISTE)

//2. D’afficher la liste complète des listes (privées ou publiques) d’un utilisateur
listesRouter.get("/utilisateur/:id", AFFICHER_LiSTE_UTILISATEUR_ID)
listesRouter.post("/utilisateur/", ASSOCIER_LISTE_UTILISATEUR)

//CREATE
//4. D’ajouter une liste
listesRouter.post("/",AJOUTER_UNE_LISTE)

//UPDATE
//4. De modifier une liste
listesRouter.put("/:id",MODIFIER_UNE_LISTE)

//DELETE
//5. De supprimer une liste
listesRouter.delete("/:id",SUPPRIMER_UNE_LISTE)

//11. Associer une chanson à une liste
listesRouter.post("/chanson",ASSOCIER_LISTE_CHANSON)


//GET
//13.afficher liste des listes
listesRouter.get("/", AFFICHER_TOUS_LISTES);

export default listesRouter;
