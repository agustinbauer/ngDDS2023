import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { DatePipe } from '@angular/common';
import { MaterialService } from 'src/app/services/material.service';
import { Material } from 'src/app/models/materiales.model';

@Component({

	selector: 'app-curso-details',
	templateUrl: './curso-details.component.html',
	styleUrls: ['./curso-details.component.css'],
	providers: [DatePipe]

})

export class CursoDetailsComponent implements OnInit {

	@Input() viewMode = false;
	@Input() currentElement: Curso = <Curso>{

		title: '',
		status: 'draft',
		content: ''

	};

	message = '';

	constructor(
		private cursoService: CursoService,
		private materialesService: MaterialService,
		private route: ActivatedRoute,
		private router: Router) { }


	private previousTemaId: any;

	selectedTemaId: number = 0;
	materialesTema?: Material[] = [];
	currentDate: string = '';

	fechaError: boolean = false;

	ngOnInit(): void {

		if (!this.viewMode) {

			this.message = '';
			this.updateMinDate();
			this.getElement(this.route.snapshot.params["id"]);

		}

	}
	getElement(id: string): void {

		this.cursoService.get(id)
			.subscribe({
				next: (data) => {
					this.currentElement = data;
					console.log(data);
				},
				error: (e) => console.error(e)
			});

	}

	updateElement(): void {

		if (!this.currentElement.nombre) {

			alert('El campo Nombre no puede estar vacío.');

		}

		else {

			this.message = '';
			this.cursoService.update(this.currentElement.id, this.currentElement)
				.subscribe({
					next: (res) => {
						console.log(res);
						this.message = res.message ? res.message : 'Curso actualizado!';
						//this.router.navigate(['/cursos']);
					},
					error: (e) => console.error(e)
				});

		}

	}
	deleteElement(): void {

		this.cursoService.delete(this.currentElement.id)
			.subscribe({
				next: (res) => {
					console.log(res);
					this.router.navigate(['/cursos']);
				},
				error: (e) => console.error(e)
			});

	}

	docentes = [
		{ id: 1, nombre: 'Roberto Pérez' },
		{ id: 2, nombre: 'Nicolas Rodriguez' },
		{ id: 3, nombre: 'Juan González' }
	];


	idDocente = this.currentElement.idDocente;
	nombreDocente: string = "";


	docenteEncontrado = this.docentes.find(docente => docente.id === this.idDocente);

	if(docenteEncontrado: any) {

		this.nombreDocente = docenteEncontrado.nombre

	}

	valorTema: number = 0;


	validarFecha() {

		this.fechaError = true;

	}


	asignarTemaId(idTema: any) {

		if (idTema !== this.previousTemaId) {

			this.selectedTemaId = idTema
			this.retrieveMaterialesPorCurso()
			this.previousTemaId = idTema

		}

	}


	retrieveMaterialesPorCurso(): void {

		this.materialesService.obtenerMaterialesPorIdCurso(this.selectedTemaId)
			.subscribe({
				next: (data) => {
					this.materialesTema = data;
					console.log(this.materialesTema);
					console.log("Materiales recuperados:", this.materialesTema);
				},
				error: (e) => console.error("Materiales no recuperados")
			});

	};

	updateMinDate() {

		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		this.currentDate = `${year}-${month}-${day}`;

	}
}

