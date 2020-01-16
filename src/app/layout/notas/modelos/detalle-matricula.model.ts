import { Matricula } from './matricula.model';
import { Asignatura } from './asignatura.model';
import { TipoMatricula } from './tipo-matricula.model';


export class DetalleMatricula {
  id?: number;
  matricula: Matricula;
  asignatura: Asignatura;
  tipo_matricula: TipoMatricula;
  paralelo: string;
  jornada: string;
  jornada_asignatura: string;
  numero_matricula: string;
  estado: string;
  nota1: number;
  nota2: number;
  nota_final: number;
  asistencia1: number;
  asistencia2: number;
  asistencia_final: number;


  constructor() {
    this.matricula = new Matricula();
    this.matricula.id = 0;
    this.tipo_matricula = new TipoMatricula();
    this.tipo_matricula.id = 0;
    this.asignatura = new Asignatura();
    this.asignatura.id = 0;
    this.numero_matricula = '';
    this.jornada = '';
    this.paralelo = '';
    this.nota1 =0;
    this.nota2 =0;
    this.nota_final =0;
    this.asistencia1 =0;
    this.asistencia2 =0;
    this.asistencia_final =0;
  }
}
