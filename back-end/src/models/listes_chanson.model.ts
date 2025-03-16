import mongoose from "mongoose";

export interface ListeChansonType {
    liste_id: mongoose.Types.ObjectId;
    chanson_id: mongoose.Types.ObjectId;
    ordre: number;
}

const listeChansonSchema = new mongoose.Schema<ListeChansonType>({
    liste_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Liste',
        required: true
    },
    chanson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chanson',
        required: true
    },
    ordre: {
        type: Number,
        required: true
    }
});

export const ListeChanson = mongoose.model('ListeChanson', listeChansonSchema);