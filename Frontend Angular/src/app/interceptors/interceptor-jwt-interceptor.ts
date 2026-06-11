import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorJwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  // récupération du tokenJwt du localstorage :
  const tokenJwt: string | null = localStorage.getItem("tokenJwt");

  //si le tokenJwt existe :
  if(tokenJwt){

    //si le tokenJwt existe : modification de la requette http intercepté, avec le jwt en plus dans le header :
    let copieRequeteHttpAvecTokenJwtEnPlus = req.clone({
      setHeaders: {
        Authorization: "Bearer " + tokenJwt
      }
    });

    //puis renvois avec next() de la requette http intercepté vers le backend Java:
    return next(copieRequeteHttpAvecTokenJwtEnPlus);
    
  }


  // sinon s'il n y a pas de tokenJwt dans le localStorage, renvois de la requette http, sans ajouter le jwt dedans :
  return next(req);
};
