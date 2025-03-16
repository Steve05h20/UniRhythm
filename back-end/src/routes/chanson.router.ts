import { Router } from 'express';

import { AFFICHER_CHANSON_ARTISTE, AFFICHER_TOUS_CHANSON, AFFICHER_UNE_CHANSON, AJOUTER_UNE_CHANSON, MODIFIER_NOMBRE_LECTURE_CHANSON, MODIFIER_UNE_CHANSON, SUPPRIMER_UNE_CHANSON } from '../controllers/chanson.controller';
import { AFFICHER_CHANSON_LISTE } from '../controllers/listes_chanson.controller';


const chansonRouter: Router = Router();
//6. afficher les chansons d’une liste
chansonRouter.get("/liste/:id", AFFICHER_CHANSON_LISTE)

//GET
chansonRouter.get("/",AFFICHER_TOUS_CHANSON)
chansonRouter.get("/:id",AFFICHER_UNE_CHANSON)




//POST 
// chansonRouter.post("/",CREER_CHANSON)
chansonRouter.post("/",AJOUTER_UNE_CHANSON)

//DELETE
chansonRouter.delete("/:id",SUPPRIMER_UNE_CHANSON)

//UPDATE
chansonRouter.put("/:id",MODIFIER_UNE_CHANSON)
chansonRouter.put("/nblecture/:id", MODIFIER_NOMBRE_LECTURE_CHANSON);

//Affichage des chansons d’un artiste selon son nom
chansonRouter.get("/artiste/:name",AFFICHER_CHANSON_ARTISTE)

export default chansonRouter;