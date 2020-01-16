import {Component, OnInit} from '@angular/core';
import {Matricula} from '../modelos/matricula.model';
import {ServiceService} from '../service.service';
import swal from 'sweetalert2';
import kjua from 'kjua';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Carrera} from '../modelos/carrera.model';
import {PeriodoAcademico} from '../modelos/periodo-academico.model';
import {Router} from '@angular/router';
import {Estudiante} from '../modelos/estudiante.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {DetalleMatricula} from '../modelos/detalle-matricula.model';
import {Asignatura} from '../modelos/asignatura.model';
import {TipoMatricula} from '../modelos/tipo-matricula.model';
import {PeriodoLectivo} from '../modelos/periodo-lectivo.model';
import {catalogos} from '../../../../environments/catalogos';
import {InformacionEstudiante} from '../modelos/informacion-estudiante.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {Notificacion} from '../modelos/notificacion.model';
import {User} from '../modelos/user.model';

@Component({
    selector: 'app-estudiante',
    templateUrl: './estudiante.component.html',
    styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {
    flagInformacionEstudiante: boolean;
    flagSeccion1: boolean;
    flagSeccion2: boolean;
    flagSeccion3: boolean;
    errors: string;
    messages: any;
    estudiante: Estudiante;
    txtPeridoActualHistorico: string;
    informacionEstudiante: InformacionEstudiante;
    matricula: Matricula;
    user: User;
    tab: any;
    jornadasOperativa: any;
    estados: any;
    fechaActual: Date;
    estudiantesHistoricos: Array<Estudiante>;
    periodoLectivoSeleccionado: PeriodoLectivo;
    txtPeriodoActualHistorico: string;
    buscadorEstudianteGeneral: string;
    periodosLectivos: Array<PeriodoLectivo>;
    archivoTemp: any;
    notificacion: Notificacion;
    doc: any;
    total_detalle_matriculas_anulados: number;
    total_detalle_matriculas_matriculados: number;
    total_detalle_matriculas_aprobados: number;
    total_detalle_matriculas_en_proceso: number;
    total_detalle_matriculas_desertores: number;
    urlExportCuposPeriodoAcademico: string;
    urlExportCuposCarrera: string;
    urlExportMatrizSniese: string;
    buscador: string;
    archivo: any;
    flagAsignaturasCupo: boolean;
    cupos: Array<Matricula>;
    detalleMatricula: Array<DetalleMatricula>;
    estudiantes: Array<Estudiante>;
    asignaturas: Array<Asignatura>;
    tiposMatricula: Array<TipoMatricula>;
    jornadas: Array<any>;
    paralelos: Array<any>;
    numerosMatricula: Array<any>;
    actual_page: number;
    records_per_page: number;
    total_pages: number;
    total_register: number;
    total_pages_pagination: Array<any>;
    total_pages_temp: number;
    flagPagination: boolean;
    total_detalle_matriculas_for_malla: Array<any>;
    matriculaSeleccionada: Matricula;
    carrera: Carrera;
    carreras: Array<Carrera>;
    periodoAcademico: string;
    periodoLectivo: string;
    periodoLectivoActual: PeriodoLectivo;
    periodoLectivos: Array<PeriodoLectivo>;
    matriculados: Array<any>;
    matriculas: Array<Matricula>;
    periodoAcademicos: Array<PeriodoAcademico>;
    rutaActual: string;

    constructor(private spinner: NgxSpinnerService,
        private service: ServiceService,
        private router: Router,
        private modalService: NgbModal) {
       }

    ngOnInit() {

        this.matricula = new Matricula();
        this.estudiante = new Estudiante();
        this.fechaActual = new Date();
        this.notificacion = new Notificacion();
        this.periodoLectivoSeleccionado = new PeriodoLectivo();
        this.matriculaSeleccionada = new Matricula();
        this.periodoLectivoActual = new PeriodoLectivo();
        this.total_detalle_matriculas_for_malla = new Array<any>();
        this.notificacion = new Notificacion();
        this.matriculas = new Array<Matricula>();
        this.carrera = new Carrera();
        this.carreras = new Array<Carrera>();
        this.fechaActual = new Date();
        this.periodoLectivoSeleccionado = new PeriodoLectivo();
        this.estudiantesHistoricos = new Array<Estudiante>();
        this.total_pages_pagination = new Array<any>();
        this.txtPeriodoActualHistorico = 'NO EXISTE UN PERIODO ABIERTO';
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.buscador = '';
        this.flagInformacionEstudiante = false;
        this.messages = catalogos.messages;
        this.estados = catalogos.estados;
        this.buscadorEstudianteGeneral = '';
        this.flagPagination = true;
        this.periodoAcademico = '';
        this.periodoLectivo = '';
        this.messages = catalogos.messages;
        this.estados = catalogos.estados;
        this.buscadorEstudianteGeneral = '';
        this.txtPeriodoActualHistorico = 'NO EXISTE UN PERIODO ABIERTO';
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.buscador = '';
        this.flagPagination = true;
        this.total_pages_temp = 10;
        this.records_per_page = 5;
        this.actual_page = 1;
        this.total_pages = 1;
        this.paralelos = catalogos.paralelos;
        this.jornadas = catalogos.jornadas;
        this.jornadasOperativa = catalogos.jornadasOperativa;
        this.numerosMatricula = catalogos.numerosMatricula;
        this.flagAsignaturasCupo = false;
        this.rutaActual = this.router.url;
        this.periodoAcademico = '';
        this.periodoLectivo = '';
        this.messages = catalogos.messages;
        this.getPeriodoAcademicos();
        this.getPeriodoLectivoActual();
        this.getPeriodoLectivos();
        this.getPeriodosLectivos();
        this.getTiposMatricula();
        this.getEstudiante();
        this. getAsignaturasNivel();
        this.getTiposMatricula();
        this.getCarreras();
        this.getMatriculasUsuario();
    }



    getEstudiante() {
        this.spinner.show();
        this.user = JSON.parse(localStorage.getItem('user')) as User;
        this.service.get('estudiantes/' + this.user.id).subscribe(
            response => {
                this.matricula = response['matricula'];
                this.estudiante = response['estudiante'];
                this.informacionEstudiante = response['informacion_estudiante'];
                this.spinner.hide();
                if (this.matricula.estado === 'EN_PROCESO' || this.matricula.estado === 'APROBADO') {
                    this.flagSeccion1 = true;
                    this.flagSeccion2 = true;
                    this.flagSeccion3 = true;
                } else {
                    this.flagSeccion1 = false;
                    this.flagSeccion2 = false;
                    this.flagSeccion3 = false;
                }
                this.flagInformacionEstudiante = true;
            },
            error => {
                this.flagInformacionEstudiante = false;
                this.spinner.hide();
                if (error.error.errorInfo[0] === '001') {
                    swal.fire(this.messages['error001']);
                } else {
                    swal.fire(this.messages['error500']);
                }
            });
    }

    getPeriodoAcademicos() {

        this.service.get('catalogos/periodo_academicos').subscribe(
            response => {
                this.periodoAcademicos = response['periodo_academicos'];
            },
            error => {
                this.spinner.hide();

            });
    }

    getPeriodoLectivoActual() {
        this.service.get('periodo_lectivos/actual').subscribe(
            response => {
                if (response['periodo_lectivo_actual'] == null) {
                    this.periodoLectivoActual = new PeriodoLectivo();
                } else {
                    this.periodoLectivoActual = response['periodo_lectivo_actual'];
                    this.periodoLectivoSeleccionado = response['periodo_lectivo_actual'];
                    this.periodoLectivoSeleccionado.fecha_fin_cupo = new Date(this.periodoLectivoActual.fecha_fin_cupo + 'T00:00:00');
                    this.txtPeriodoActualHistorico = 'PERIODO LECTIVO ACTUAL';
                }
            },
            error => {
                this.spinner.hide();

            });
    }

    getPeriodoLectivos() {
        this.service.get('periodo_lectivos').subscribe(
            response => {
                this.periodoLectivos = response['periodo_lectivos'];
            },
            error => {
                this.spinner.hide();

            });
    }

    getTiposMatricula() {
        this.service.get('tipo_matriculas').subscribe(
            response => {
                this.tiposMatricula = response['tipo_matriculas'];
            },
            error => {
                this.spinner.hide();

            });
    }

    getPeriodosLectivos() {
        this.spinner.show();
        this.service.get('periodo_lectivos/historicos').subscribe(
            response => {
                this.periodosLectivos = response['periodos_lectivos_historicos'];
                this.periodosLectivos.forEach(value => {
                    if (value.estado === 'ACTUAL') {
                        this.periodoLectivoSeleccionado = value;
                    }
                });
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
            });
    }
    getCarreras() {
        this.spinner.show();
        this.service.get('catalogos/carreras?user_id=' + this.user.id).subscribe(
            response => {
                this.carreras = response['carreras'];
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
            });
    }
    getMatriculasUsuario() {
        this.spinner.show();
        this.service.get('catalogos/carreras?user_id=' + this.user.id).subscribe(
            response => {
                this.carreras = response['carreras'];
                this.spinner.hide();
            },
            error => {
                this.spinner.hide();
            });
    }
    getAsignaturasNivel() {
        this.service.get('detalle_matriculas?id=2573')
            .subscribe(
                response => {
                    this.detalleMatricula = response['detalleMatricula'];
                },
                error => {
                    this.spinner.hide();
                    swal.fire(this.messages['error500']);
                });
    }


    cambiarPeriodoLectivoActual() {
        this.periodosLectivos.forEach(value => {
            if (value.id === this.periodoLectivoActual.id) {
                this.periodoLectivoSeleccionado = value;
                if (value.estado !== 'ACTUAL') {
                    this.txtPeridoActualHistorico = 'PERIODO LECTIVO HISTÓRICO';
                } else {
                    this.txtPeridoActualHistorico = 'PERIODO LECTIVO ACTUAL';
                }

            }
        });
    }



     }


