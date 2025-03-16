import mongoose from "mongoose"
import { ChansonType } from "./chanson.model"

export enum TypeListe {
    ARTISTE = "Artiste",
    ALBUM = "Album",
    LISTE_DE_LECTURE = "Liste de lecture"
}

export enum TypeVisibilite {
    PUBLIQUE = "Publique",   
    PRIVE = "Privé"   
}

export interface ListeType {
    titre: string
    sousTitre?: string
    image?: string
    description?: string
    type: TypeListe
    verifie?: boolean
    dateDePublication: Date
    visibilite: TypeVisibilite
    nombreDeSauvegardes: number
}

const listeSchema = new mongoose.Schema<ListeType>({
    titre: {
        type: String,
        required: [true, "Veuillez entrer un titre"],
        minlength: [2, "le titre ne peut avoir moins de 2 caractères"],
        maxlength: [50, "Le titre ne peut excéder de 50 caractères"]
    },
    sousTitre: {
        type: String,
        required: false,
        maxlength: [50, "Le titre ne peut excéder 50 caractères"]
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        maxlength: [255, "Le lien ne peut excéder 250 caractères"]
    },
    type: {
        type: String,
        enum: Object.values(TypeListe),  
        required: true
    },
    verifie: {
        type: Boolean,
        default: false,
        required: false
    },
    dateDePublication: {
        type: Date,
        default: Date.now,
        required: true
    },
    visibilite: {
        type: String,
        required: true,
        enum: Object.values(TypeVisibilite)  
    },
    nombreDeSauvegardes: {
        type: Number,
        required: false,
        default: 0
    },
   
}, { timestamps: true ,collection:"Listes"})

export const Liste = mongoose.model("Liste", listeSchema)