export interface IListe {
  _id?: string,
  titre: string
  sousTitre?: string
  image?: string
  description?: string
  type: "Artiste" | "Album" | "Liste de lecture"
  verifie?: boolean
  dateDePublication: string
  visibilite: "Publique" | "Privé"
  nombreDeSauvegardes: number
  chansons: IChanson[]
}

export interface IChanson {

  _id?: string,
  titre: string,
  nomArtiste: string,
  nomAlbum: string,
  paroles?: string,
  dateDePublication: string,
  dureeSecondes: number,
  nbLecture: number,
}


