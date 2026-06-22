import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  
  // injecte le router dans la fonction guardAuthGuard()
  const router = inject(Router);

  const tokenJwt: String | null = localStorage.getItem("tokenJwt");

  // si l'utilisateur est bien non connecté (sans jwtToken dans le LocalStorage), 
  // retourne true:
  if(tokenJwt == null){
    return true;
  }
  

  // si l'utilisateur est connecté, donc avec son jwtToken dans le LocalStorage), 
  // redirige vers la page Dashboard, s'il va vers par exemple la page /authentification ou creation de compte, est retourne false :
  router.navigate(['/dashboard']);
  return false;

};
