export class Usuario {
  id!: string;
  cedula: string  = "";
  nombre: string = "";
  apellido: string = "";
  unidadEducativa: string = "";
  fechaNacimiento: string = "";
  correo!: string;
  username!: string;
  password!: string;
  rol!: string;
  capacidad_especial!: boolean;
  diagnostico_medico!: any;
  diagnostico_lenguaje!: any;
}