import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceExtraitDescription {

  private extraitTexte!: string;

  // Raccourcissement de la longueur de la description pour pouvoir l'afficher sur chaque moi en tant qu'étiquettes:
  transformationDescriptionEnExtrait(description: string): string{

    // raccourcissement de la longueur de la description
    this.extraitTexte = description.substring(0,20);

    // s'il ya des espaces dans la description (et que ça n'est pas juste 1 seul mot), 
    // récupération du dernier espace pour ne pas couper un mot au milieu:
    if(this.extraitTexte.includes(" ")){

      this.extraitTexte = this.extraitTexte.substring(0, this.extraitTexte.lastIndexOf(" "));

    }

    // ajout des 3 points de suspensions pour montrer que c'est un extrait de la description:
    this.extraitTexte = this.extraitTexte + " ...";


    return this.extraitTexte;

  }

}
