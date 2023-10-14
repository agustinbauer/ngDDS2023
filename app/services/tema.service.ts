import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';

const baseUrl = 'http://localhost:4200/api/temas';

@Injectable({

	providedIn: 'root'

})

export class TemaService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<Tema[]> {

		return this.http.get<Tema[]>(baseUrl);

	}
	get(id: any): Observable<Tema> {

		return this.http.get<Tema>(`${baseUrl}/${id}`);

	}
	create(data: any): Observable<any> {

		console.log(data);
		return this.http.post(`${baseUrl}`, data, { responseType: 'text' });

	}
	update(id: any, data: Tema): Observable<any> {

		const bodyData = {

			"id": id,
			"nombre": data.nombre,
			"duracion": data.duracion

		};
		return this.http.put(`${baseUrl}`, bodyData, { responseType: 'text' });

	}
	delete(id: any): Observable<any> {

		return this.http.delete(`${baseUrl}/delete/${id}`, { responseType: 'text' });

	}
	deleteAll(): Observable<any> {

		return this.http.delete(baseUrl);

	}
	findByTitle(nombre: any): Observable<Tema> {

		return this.http.get<Tema>(`${baseUrl}?nombre=${nombre}`);

	}
}
