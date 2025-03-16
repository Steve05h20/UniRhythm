import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';
import { Utilisateur, UtilisateurType } from '../models/utilisateur.model';

export const AFFICHER_TOUT_UTILISATEUR: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const users = await Utilisateur.find();
        res.status(200).json({
            success: true,
            users
        });
        return;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des utilisateurs"
        });
        return;
    }
};

export const AFFICHER_UN_UTILISATEUR: RequestHandler = async (req:Request,res:Response)=>{
    const {id} = req.params
    try{
        const user = await Utilisateur.findById(id)
        res.status(200).json({success:true,user})
        return
    }catch(e){
        res.status(500).json({success:false, message: "Erreur lors de la récupération des utilisateurs"})
        return
    }
}


export const CREER_UN_UTILISATEUR:RequestHandler = async(req:Request,res:Response) => {
    try{
        const nouvelleUtilisateur:UtilisateurType = {
            nom:req.body.nom,
            prenom:req.body.prenom,
            courriel:req.body.courriel,
        }
        if(!nouvelleUtilisateur.nom || !nouvelleUtilisateur.prenom || !nouvelleUtilisateur.courriel){
            res.status(400).json({
                success:false,
                message:"Les champs nom, prenom et courriel sont obligatoires"
            });
            return;
        }
        const user = await Utilisateur.create(nouvelleUtilisateur)

        res.status(201).json({
            success: true,
            message:"création de l'utilisateur avec succès",
            user: user
        });


    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Erreur lors de la création de l'utilisateur",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
}


export const SUPPRIMER_UN_UTILISATEUR: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await Utilisateur.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Utilisateur supprimé avec succès"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la suppression de l'utilisateur",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
};


export const MODIFIER_UN_UTILISATEUR: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData: Partial<UtilisateurType> = req.body;

        const modifierUtilisateur = await Utilisateur.findByIdAndUpdate(id, updateData, { new: true });

        if (!modifierUtilisateur) {
            res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Utilisateur modifié avec succès",
            user: modifierUtilisateur
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la modification de l'utilisateur",
            error: error instanceof Error ? error.message : "Erreur inconnue"
        });
    }
};