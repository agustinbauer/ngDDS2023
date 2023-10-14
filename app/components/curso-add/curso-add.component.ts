import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { MaterialesService } from 'src/app/services/materiales.service';
import { Material } from 'src/app/models/materiales.model';
import { DatePipe } from '@angular/common';
import { TemasService } from 'src/app/services/temas.service';
import { Tema } from 'src/app/models/tema.model';


@Component({
	selector: 'app-curso-add',
	templateUrl: './curso-add.component.html',
	styleUrls: ['./curso-add.component.css'],
	providers: [DatePipe]
})
export class CursoAddComponent implements OnInit {

	curso: Curso = {

		nombre: '',
		fechaInicio: new Date(),
		idDocente: 1,
		tema: {
			id: 1
		}

	};
	material: Material = <Material>{

		titulo: '',
		costo: 0,
		idCurso: 0,
		stock: 0

	}
	tema: Tema = <Tema>{

		nombre: '',
		duracion: 0

	}
	submitted = false;


	docentes = [

		{ id: 1, nombre: 'Roberto Pérez' },
		{ id: 2, nombre: 'Nicolas Rodriguez' },
		{ id: 3, nombre: 'Juan González' }

	];


	constructor(private cursoService: CursoService,
		private materialesService: MaterialesService,
		private temasService: TemasService) { }

	fechaError: boolean = false;
	valorTema: number = 0;
	materiales?: Material[] = [];
	materialesTema?: Material[] = [];
	temas?: Tema[] = [];
	valorMaterial: number = 0;
	currentDate: string = '';


	ngOnInit(): void {

		this.retrieveMateriales(),
			this.updateMinDate();
		this.retrieveTemas()

	}

	saveCurso(): void {

		if (!this.curso.nombre) {

			alert('El campo Nombre no puede estar vacío.');

		}
		else {

			const data = {

				id: this.curso.id,
				nombre: this.curso.nombre,
				fechaInicio: this.curso.fechaInicio,
				idDocente: this.curso.idDocente,
				tema: { id: this.valorTema }

			};
			this.validarFecha();
			if (this.fechaError == true) {

				this.cursoService.create(data)
					.subscribe({
						next: (res) => {
							console.log(res);
							this.submitted = true;
						},
						error: (e) => {
							console.error(e);
						}
					});

			}

		}

	}

	newCurso(): void {

		this.submitted = false;
		this.curso = {
			nombre: '',
			fechaInicio: new Date(),
			idDocente: 1,
			tema: {
				id: this.valorTema
			}
		};

	}

	retrieveMateriales(): void {

		this.materialesService.getAll()
			.subscribe({
				next: (data) => {
					this.materiales = data;
					console.log(this.materiales);
				},
				error: (e) => console.error(e)
			});

	};

	retrieveTemas(): void {

		this.temasService.getAll()
			.subscribe({
				next: (data) => {
					this.temas = data;
					console.log(this.temas);
				},
				error: (e) => console.error(e)
			});

	};

	retrieveMaterialesPorTema(): void {

		this.materialesService.getByTema(this.valorTema)
			.subscribe({
				next: (data) => {
					this.materialesTema = data;
					console.log(this.materialesTema);
				},
				error: (e) => console.error(e)
			});

	}



	validarFecha() {

		this.fechaError = true;

	}

	updateMinDate() {

		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		this.currentDate = `${year}-${month}-${day}`;

	}
}
