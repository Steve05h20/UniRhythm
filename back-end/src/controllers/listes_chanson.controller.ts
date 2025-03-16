import { Chanson } from '../models/chanson.model';
import { Request, RequestHandler, Response } from 'express';
import { ListeChanson, ListeChansonType } from '../models/listes_chanson.model';
import { Liste } from '../models/listes.model';


//afficher les chansons d'une liste en particulier (selon son identifiant)

export const AFFICHER_CHANSON_LISTE: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // Récupérer toutes les entrées ListeChanson pour cette liste, triées par ordre
        const listesChansons = await ListeChanson.find<ListeChansonType>({ liste_id: id })
            .sort({ ordre: 1 });

        if (!listesChansons || listesChansons.length === 0) {
            res.status(404).json({
                success: false,
                message: "Aucune chanson trouvée dans cette liste"
            });
            return;
        }

        //recuperer la liste
        const liste = await Liste.findById(id);
        if (!liste) {
            res.status(404).json({
                success: false,
                message: "Liste non trouvée"
            });
            return;
        }

        // Récupérer les IDs des chansons
        const chansonIds = listesChansons.map(lc => lc.chanson_id);

        // Récupérer toutes les chansons correspondantes
        const chansons = await Chanson.find({
            '_id': { $in: chansonIds }
        });

        const listeAvecChansons = {
            ...liste.toObject(),
            chansons: chansons
        };
    
        res.status(200).json(listeAvecChansons);
        
    } catch (error) {
        console.error('Erreur détaillée:', error);
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des chansons de la liste"
        });
    }
};


export const ASSOCIER_LISTE_CHANSON: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { liste_id, chanson_id, ordre } = req.body as ListeChansonType;

        if (!liste_id || !chanson_id || !ordre) {
            res.status(400).json({
                success: false,
                message: "L'identifiant de la liste, de la chanson et l'ordre sont obligatoires"
            });
            return;
        }

        // Vérifier si la liste existe
        if (!await Liste.findById(liste_id)) {
            res.status(400).json({
                success: false,
                message: "La liste n'existe pas"
            });
            return;
        }

        // Vérifier si la chanson existe
        if (!await Chanson.findById(chanson_id)) {
            res.status(400).json({
                success: false,
                message: "La chanson n'existe pas"
            });
            return;
        }

        // Créer l'association
        const listeChanson = new ListeChanson({
            liste_id,
            chanson_id,
            ordre
        });

        await listeChanson.save();

        res.status(201).json({
            success: true,
            listeChanson
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'association de la chanson à la liste"
        });
    }
}