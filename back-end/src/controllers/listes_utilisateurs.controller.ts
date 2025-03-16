import { RequestHandler,Response,Request } from "express";
import { Liste, ListeType } from "../models/listes.model";
import { ListeUtilisateur, ListeUtilisateurType } from "../models/listes_utilisateurs.model";
import { Utilisateur, UtilisateurType } from "../models/utilisateur.model";

//D’afficher la liste complète des listes (privées ou publiques) d’un utilisateur
export const AFFICHER_LiSTE_UTILISATEUR_ID: RequestHandler = async (req: Request, res: Response) => {
    try {
        const {id} = req.params; // ou req.user.id selon votre authentification
        
        // Récupérer les associations liste-utilisateur
        const listesUtilisateur = await ListeUtilisateur.find<ListeUtilisateurType>({ 
            utilisateur_id: id 
        }).sort({ ordre: 1 });

        // Récupérer les listes complètes avec leurs chansons
        const listes = await Liste.find({
            _id: { 
                $in: listesUtilisateur.map(lu => lu.liste_id) 
            }
        })
        // .populate('chansons');

        res.status(200).json({
            success: true,
            listes,  ordre: listesUtilisateur.map(lu => lu.ordre)   });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des listes de l'utilsateur",error
        });
    }
}

export const ASSOCIER_LISTE_UTILISATEUR: RequestHandler = async (req: Request, res: Response) => {
    try{
        // recuperer un utilisateur par son id
        // recuperer une liste par son id

        const {utilisateur_id,liste_id,ordre}:ListeUtilisateurType = req.body

        if(!utilisateur_id || !liste_id || !ordre){
            res.status(400).json({
                success:false,
                message:"L'utilisateur_id, liste_id et l'ordre sont obligatoires"
            });
            return;
        }

        // verifier si l'utilisateur existe
        if(!await Utilisateur.findById<UtilisateurType>(utilisateur_id)){
            res.status(400).json({
                success:false,
                message:"L'utilisateur n'existe pas"
            });
            return;
        }
        // verifier si la liste existe
        if(!await Liste.findById<ListeType>(liste_id)){
            res.status(400).json({
                success:false,
                message:"La Liste n'existe pas"
            });
            return;
        }

        // verifier si l'ordre est un nombre{
        if(isNaN(ordre)){
            res.status(400).json({
                success:false,
                message:"L'ordre doit être un nombre"
            });
            return
        }

        // verifier si l'association existe
        if(await ListeUtilisateur.findOne<ListeUtilisateurType>({utilisateur_id,liste_id,ordre})){
            res.status(400).json({
                success:false,
                message:"L'association existe déjà"
            });
            return;
        }
        // creer une association liste-utilisateur
        const listeUtilisateur = await ListeUtilisateur.create<ListeUtilisateurType>({utilisateur_id,liste_id,ordre});
        res.status(201).json({
            success:true,
            message:"Association créée avec succès",
            listeUtilisateur
        });

    }catch(e){
        res.status(500).json({
            success:false,
            message:"Erreur lors de l'association de la liste à l'utilisateur",e
        });
    }
}