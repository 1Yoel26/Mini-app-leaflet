// Interface pour structurer le type qui va stocker la réponse 
// du formulaire avec la zonne cliqué par l'utilisateur 
// + sa description dessus:

export interface PointAndDescriptionDto {

    coordonneeLongitude: number;
    coordonneeLatitude: number;
    description: string;

}
