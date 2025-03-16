import mongoose from 'mongoose';

export interface ChansonType {
    titre: string;
    nomArtiste: string;
    nomAlbum: string;
    paroles?: string;
    dateDePublication: Date;
    dureeSecondes: number;
    nbLecture: number;
}

const chansonSchema = new mongoose.Schema<ChansonType>({
    titre: {
        type: String,
        required: [true, "Le titre est requis"],
        minlength: [1, "Le titre doit contenir au moins 1 caractère"],
        maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
        trim: true
    },
    nomArtiste: {
        type: String,
        required: [true, "Le nom de l'artiste est requis"],
        minlength: [1, "Le nom de l'artiste doit contenir au moins 1 caractère"],
        maxlength: [100, "Le nom de l'artiste ne peut pas dépasser 100 caractères"],
        trim: true
    },
    nomAlbum: {
        type: String,
        required: [true, "Le nom de l'album est requis"],
        minlength: [1, "Le nom de l'album doit contenir au moins 1 caractère"],
        maxlength: [100, "Le nom de l'album ne peut pas dépasser 100 caractères"],
        trim: true
    },
    paroles: {
        type: String,
        required: false,
        maxlength: [5000, "Les paroles ne peuvent pas dépasser 5000 caractères"]
    },
    dateDePublication: {
        type: Date,
        required: [true, "La date de publication est requise"]
    },
    dureeSecondes: {
        type: Number,
        required: [true, "La durée est requise"],
        min: [0, "La durée ne peut pas être négative"]
    },
    nbLecture: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Le nombre de lectures ne peut pas être négatif"]
    }
}, {
    timestamps: true,
    collection: "chansons"
});

export const Chanson = mongoose.model("Chanson", chansonSchema);