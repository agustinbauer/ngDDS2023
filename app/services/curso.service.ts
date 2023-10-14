import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

const baseUrl = 'http://localhost:4200/api/cursos';

@Injectable({
	
	providedIn: 'root'
	
})

export class CursoService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<Curso[]> {

		return this.http.get<Curso[]>(baseUrl);

	}
	get(id: any): Observable<Curso> {

		return this.http.get<Curso>(`${baseUrl}/${id}`);

	}
	create(data: any): Observable<any> {

		console.log(data);
		return this.http.post(`${baseUrl}`, data, { responseType: 'text' });

	}
	update(id: any, data: Curso): Observable<any> {

		const bodyData = {

			"id": id,
			"nombre": data.nombre,
			"fechaInicio": data.fechaInicio,
			"idDocente": data.idDocente,
			"tema": data.tema

		};
		return this.http.put(`${baseUrl}`, bodyData, { responseType: 'text' });

	}
	delete(id: any): Observable<any> {

		return this.http.delete(`${baseUrl}/delete/${id}`, { responseType: 'text' });

	}
	deleteAll(): Observable<any> {

		return this.http.delete(baseUrl);

	}
	findByTitle(nombre: any): Observable<Curso> {

		return this.http.get<Curso>(`${baseUrl}?nombre=${nombre}`);

	}
}
