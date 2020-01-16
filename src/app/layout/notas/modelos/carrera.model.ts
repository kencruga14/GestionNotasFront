import {Instituto} from './instituto.model';

export class Carrera {
    id?: number;
    instituto: Instituto;
    codigo: string;
    numero_resolucion: string;
    codigo_sniese: string;
    nombre: string;
    modalidad: string;
    titulo_otorga: string;
    siglas: string;
    tipo_carrera: string;
    descripcion: string;
    estado: string;

    seleccionada: boolean;

    constructor() {

    }
}
