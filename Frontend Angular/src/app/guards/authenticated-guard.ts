import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  
 
  // injecte le router dans la fonction guardAuthGuard()
  const router = inject(Router);

  const tokenJwt: String | null = localStorage.getItem("tokenJwt");

  // si l'utilisateur est bien connecté (avec jwtToken dans le LocalStorage), 
  // retourne true:
  if(tokenJwt && tokenJwt.split(".").length >= 3){
    return true;
  }
  

  // si l'utilisateur n'est pas connecté, donc sans son jwtToken dans le LocalStorage), 
  // redirige vers la page Login, est retourne false :
  router.navigate(['/authentification']);
  return false;


};
