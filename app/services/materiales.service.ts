import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../models/materiales.model';

const baseUrl = 'http://localhost:4200/api/materiales';
//const baseUrl = 'http://localhost:8080/materiales';

@Injectable({
  providedIn: 'root'
})

export class MaterialesService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(baseUrl);
  }
  get(id: any): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
	console.log(data);
	//Conversione a form data
	//const formData = new FormData();
	//formData.append('title', <string>data.title);
    //formData.append('status', <string>data.status);
	//formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
  update(id: any, data: Material): Observable<any> {
	//Conversione a form data
	const bodyData = {
		"id": id,
    	"titulo": data.titulo,
    	"costo": data.costo,
    	"idCurso": data.idCurso ,
    	"stock": data.stock
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Material> {
    return this.http.get<Material>(`${baseUrl}?nombre=${nombre}`);
  }
   
   getByTema(idCurso: number): Observable<Material[]> {
    return this.http.get<Material[]>(`${baseUrl}/curso/${idCurso}`);}}
  
