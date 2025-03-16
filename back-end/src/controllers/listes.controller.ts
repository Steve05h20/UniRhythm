import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import { Liste, ListeType, TypeListe, TypeVisibilite } from '../models/listes.model';
import { ListeUtilisateur } from '../models/listes_utilisateurs.model';
import { ChansonType } from '../models/chanson.model';


//D’afficher la liste complète des listes (privées ou publiques
export const AFFICHER_TOUS_LISTES: RequestHandler = async (req: Request,res: Response) => {
    try {
        const listesPublique = await Liste.find()  ;
        res.status(200).json(listesPublique
        );
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des listes publique"+error
        });
        return;
    }
};


//D’afficher la liste complète des listes publiques
export const AFFICHER_LISTE_PUBLIQUE: RequestHandler = async (req: Request,res: Response) => {
    try {
        const listesPublique = await Liste.find({ visibilite: TypeVisibilite.PUBLIQUE })  ;
        res.status(200).json(
            listesPublique
        );
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des listes publique"+error
        });
        return;
    }
};

// D’afficher une liste en particulier (selon son identifiant)
export const AFFICHER_UNE_LISTE: RequestHandler = async (req: Request,res: Response) => {
    try {
        const {id} = req.params
        const liste = await Liste.findById(id);
        if (!liste) {
            res.status(404).json({
                success: false,
                message: "Liste non trouvée"
            });
            return;
        }
        res.status(200).json(
            liste
        );
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de la liste"
        });
        return;
    }
};


//D’ajouter une liste
export const AJOUTER_UNE_LISTE: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const nouvelleListe: ListeType = {
            titre: req.body.titre,
            sousTitre: req.body.sousTitre,
            image: req.body.image,
            description: req.body.description,
            type: req.body.type,
            verifie: false,
            dateDePublication: req.body.dateDePublication || new Date(),
            visibilite: req.body.visibilite,
            nombreDeSauvegardes: 0,
        };

        // Validation des champs obligatoires
        if (!nouvelleListe.titre || !nouvelleListe.type || !nouvelleListe.visibilite) {
            res.status(400).json({
                success: false,
                message: "Les champs titre, type et visibilité sont obligatoires"
            });
            return;
        }

        // Validation du type de liste
        if (!Object.values(TypeListe).includes(nouvelleListe.type)) {
            res.status(400).json({
                success: false,
                message: "Le type de liste n'est pas valide"
            });
            return;
        }

        // Validation de la visibilité
        if (!Object.values(TypeVisibilite).includes(nouvelleListe.visibilite)) {
            res.status(400).json({
                success: false,
                message: "Le type de visibilité n'est pas valide"
            });
            return;
        }

        const liste = await Liste.create<ListeType>(nouvelleListe);
        
        res.status(201).json({
            success: true,
            data: liste
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de la liste",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
};

//D’ajouter une liste
export const SUPPRIMER_UNE_LISTE: RequestHandler = async (req: Request,res: Response) => {
        const {id} = req.params
    try {
        const liste = await Liste.findByIdAndDelete<ListeType>(id);
        res.status(200).json({
            success: true,
            message: "Suppression de la liste avec succès"
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression de la liste"
        });
        return;
    }
};


//modifier une liste
export const MODIFIER_UNE_LISTE : RequestHandler = async (req: Request,res: Response) => {

try
   {    const {id} = req.params
    const modification : Partial<ListeType> = req.body;

    const listexiste :ListeType | null = await Liste.findByIdAndUpdate<ListeType>(id,{$set:modification},{new:true,runValidators:true})
    
    res.status(200).json({
        success: true,
        data: listexiste
    })
}
catch (error) {
    res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Une erreur est survenue"
    });
}};


