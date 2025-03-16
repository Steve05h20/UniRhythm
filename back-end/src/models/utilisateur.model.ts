import mongoose from "mongoose";

export interface UtilisateurType{
    nom:string;
    prenom:string;
    courriel:string;
    creerLe?:Date;
    modifierLe?:Date;
}

const utilisateurSchema = new mongoose.Schema<UtilisateurType>({
    nom:{type:String,required:[true,"Le nom est requis"], minlength:[2,"Le nom doit contenir au moins 2 caractères"] ,maxlength:[100, "Le nom ne peut pas dépasser 100 caractères"] ,trim:true, },

    prenom:{type:String,required:[true,"Le prénom est requis"], minlength:[2,"Le prénom doit contenir au moins 2 caractères"] ,maxlength:[100, "Le prénom ne peut pas dépasser 100 caractères"] ,trim:true, },

    courriel:{type:String,required:[true, "L'email est requis"],unique:true,lowercase:true,trim:true,validate:{
        validator:(v:string)=>{
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: "Format d'email invalide"
    }},

    creerLe: {type: Date,default: Date.now},
    modifierLe:{type:Date,default:Date.now}
},{
    timestamps: {
        createdAt: 'creerLe',
        updatedAt: 'modifierLe'
    },
    collection:"utilisateurs"
})

export const Utilisateur = mongoose.model("Utilisateur",utilisateurSchema)