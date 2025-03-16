import mongoose from "mongoose";

export interface ListeUtilisateurType {
    utilisateur_id: mongoose.Types.ObjectId;
    liste_id: mongoose.Types.ObjectId;
    ordre: number;
}

const listeUtilisateurSchema = new mongoose.Schema<ListeUtilisateurType>({
    utilisateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    liste_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Liste',
        required: true
    },
    ordre: {
        type: Number,
        required: true
    }
});

export const ListeUtilisateur = mongoose.model('ListeUtilisateur', listeUtilisateurSchema);