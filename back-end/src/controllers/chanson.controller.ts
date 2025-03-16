//D’afficher les chansons d’un artiste en particulier (selon son identifiant)

import { Request, RequestHandler, Response } from "express";
import { Chanson, ChansonType } from "../models/chanson.model";

export const AFFICHER_CHANSON_ARTISTE: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;

        //remplacer les plus par des espaces, enlever les espaces avant et après enlever les .()[]{}:"":
        const namefilterPlus = name.replace(/\+/g, ' ').trim().replace(/[^a-zA-Z0-9 ]/g, "");

        // Récupérer toutes les chansons correspondantes au nom de l'artiste ou inclus le nom de l'artiste
        const chansons = await Chanson.find({ nomArtiste: { $regex: namefilterPlus, $options: 'i' } });
        
        if (chansons.length === 0) {
            res.status(404).json({
                success: false,
                message: "Chansons non trouvée"
            });
            return;
        }

        res.status(200).json({
            success: true,
            chansons: chansons
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération des chansons de l'artiste"
        });
    }
};
// D’ajuster le nombre de lectures (à la hausse) d’une chanson en particulier (selon son identifiant)

export const MODIFIER_NOMBRE_LECTURE_CHANSON: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nbLecture } = req.body;
        
        const chanson = await Chanson.findByIdAndUpdate<ChansonType>(
            id,
            { nbLecture },
            { new: true }
        );
        
        if (!chanson) {
            res.status(404).json({
                success: false,
                message: "Chanson non trouvée"
            });
            return;
        }

        res.status(200).json({
            success: true,
            chanson: chanson
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la mise à jour du nombre de lectures"
        });
    }
};

export const AJOUTER_UNE_CHANSON: RequestHandler = async (req: Request, res: Response) => {
    try {
        const nouvelleChanson: ChansonType = {
            titre: req.body.titre,
            nomArtiste: req.body.nomArtiste,
            dureeSecondes: req.body.dureeSecondes,
            dateDePublication: req.body.dateDePublication,
            nbLecture: req.body.nbLecture,
            nomAlbum: req.body.nomAlbum,
            paroles: req.body.paroles
        };

        if(
            !nouvelleChanson.titre || 
            !nouvelleChanson.nomArtiste || 
            !nouvelleChanson.dureeSecondes || 
            !nouvelleChanson.dateDePublication || 
            !nouvelleChanson.nbLecture || 
            !nouvelleChanson.nomAlbum){
                res.status(400).json({
                    success: false,
                    message: "Le titre, le nom de l'artiste, la durée, la date de publication, le nombre de lectures et le nom de l'album sont obligatoires"
                });
                return;
        }

        if(nouvelleChanson.dureeSecondes < 0){
            res.status(400).json({
                success: false,
                message: "La durée ne peut pas être négative"
            });
            return;
        }

        
        const chanson = new Chanson(nouvelleChanson);
        await chanson.save();
        res.status(201).json({
            success: true,
            chanson
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de l'ajout de la chanson"
        });
    }
}

export const AFFICHER_TOUS_CHANSON : RequestHandler = async (req:Request,res:Response) => {
    try{
        const chansons = await Chanson.find()
        if(chansons.length === 0){
            res.status(400).json({success:false,message:"chansons non trouvé"})
            return
        }
        res.status(201).json(chansons)
        
    }catch(e){
        console.error(e)
        res.status(500).json({success:false,message:`Erreur serveur: ${e}`})
    }
}

export const AFFICHER_UNE_CHANSON : RequestHandler = async (req:Request,res:Response) => {
    try{
        const {id} = req.params
        const chanson = await Chanson.findById(id)
        if(!chanson){
            res.status(400).json({success:false,message:"chansons non trouvé"})
            return
        }
        res.status(201).json({success:true,data:chanson})
        
    }catch(e){
        console.error(e)
        res.status(500).json({success:false,message:`Erreur serveur: ${e}`})
    }
}

export const SUPPRIMER_UNE_CHANSON : RequestHandler = async(req:Request , res:Response) => {
    try {
        const {id}=req.params
        const deleteChanson = await Chanson.findByIdAndDelete(id)
        res.status(200).json({success:true,message:`La chanson id:${id} à etait supprimée`})
    } catch (error) {
        res.status(400).json({success:false,message:`La chanson est introuvable`})
    }
}

export const MODIFIER_UNE_CHANSON: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData: Partial<ChansonType> = req.body; 

        const updateChanson = await Chanson.findByIdAndUpdate(id, updateData, { new: true });
        if (!updateChanson) {
            res.status(404).json({ success: false, message: "La chanson est introuvable" });
            return;
        }
        res.status(200).json({ success: true, message: `La chanson id:${id} a été mise à jour`, chanson: updateChanson });
    } catch (error) {
        res.status(400).json({ success: false, message: `La chanson est introuvable` });
    }
};

