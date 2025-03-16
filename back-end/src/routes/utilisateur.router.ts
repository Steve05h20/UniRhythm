import { Router } from 'express';
import { AFFICHER_TOUT_UTILISATEUR, AFFICHER_UN_UTILISATEUR, CREER_UN_UTILISATEUR, MODIFIER_UN_UTILISATEUR, SUPPRIMER_UN_UTILISATEUR } from '../controllers/utilsateur.controller';


const utilisateurRouter: Router = Router();

//GET
utilisateurRouter.get("/", AFFICHER_TOUT_UTILISATEUR);
utilisateurRouter.get("/:id", AFFICHER_UN_UTILISATEUR);

//AJOUTER
utilisateurRouter.post("/",CREER_UN_UTILISATEUR)

//DELETE
utilisateurRouter.put("/:id",SUPPRIMER_UN_UTILISATEUR)

//UPDATE
utilisateurRouter.put("/:id",MODIFIER_UN_UTILISATEUR)

export default utilisateurRouter;