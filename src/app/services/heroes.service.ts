import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../model/heroe.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

   private url = 'https://crud-56d47.firebaseio.com';

  constructor( private http: HttpClient ) {

   }

   borrarHeroe( id: string ) {

    return this.http.delete(`${this.url}/heroes/${ id }.json`);
   }

   getHeroeEdi( id: string ) {

    return this.http.get(`${this.url}/heroes/${ id }.json`);
   }

   crearHeroe( heroe: HeroeModel ) {

    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe( heroe: HeroeModel ) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroe() {

    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(  this.creaArrreglo ),
      delay(1500)
    );
  }

  private creaArrreglo( heroesObj: object) {

    const heroes: HeroeModel[] = [];

    // tslint:disable-next-line: whitespace
    if (heroesObj === null ) { return [];}

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;

  }
}
