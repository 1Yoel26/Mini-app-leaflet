import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ServiceAuthentification } from '../services/services-event/service-authentification';

export const interceptorJwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  // récupération du tokenJwt du localstorage :
  const tokenJwt: string | null = localStorage.getItem("tokenJwt");

  const serviceAuthentification = inject(ServiceAuthentification);

  //si le tokenJwt existe :
  if(tokenJwt){

    //si le tokenJwt existe : modification de la requette http intercepté, avec le tokenJwt en plus dans le header :
    let copieRequeteHttpAvecTokenJwtEnPlus = req.clone({
      setHeaders: {
        Authorization: "Bearer " + tokenJwt
      }
    });


    //puis renvois avec next() de la requette http intercepté vers le backend Java:
    return next(copieRequeteHttpAvecTokenJwtEnPlus).pipe(

      catchError( (erreur) => {
        console.log("erreur du catchError : " + erreur.status);
        console.log("erreur du catchError : " + erreur.error);

        if(erreur.status === 401 && erreur.error === "TokenJwt invalide"){
          alert("TokenJwt expiré ou invalide")
          serviceAuthentification.nextDeconnecter();
        }

        return throwError(()=> erreur);

        
      })
      
    );
     
  }


  // sinon s'il n y a pas de tokenJwt dans le localStorage, renvois de la requette http, sans ajouter le jwt dedans :
  return next(req);
};
