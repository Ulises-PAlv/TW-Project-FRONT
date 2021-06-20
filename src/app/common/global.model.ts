// ?? AQUI IRAN VARIABLES QUE REQUIERAN SER GLOBALES & MODELOS ###

export class GlobalModel {
  public static apiURL: string = 'http://localhost:3000';

  public static querysUsers = {
    GetAll: '/user',
    GetID: '/user/',
    PostUsr: '/registro',
    Correo: '/correo/',
    Aux: '/user/',
    PostConect: '/conectados',
    GetConect: '/conectados',
    ChangeSate: '/cambiarEstado/',
    Desconect: '/desconectar'
  };

  public static querysPatients = {
    PostRegister: '/RegistroPac',
    GetAll: '/paciente',
    GetPatient: '/paciente/',
    DeletePatient: '/borrarPaciente'
  };

  public static querysExpedientes = {
    PostCreate: '/RegistroExp',
    GetAll: '/expediente',
    GetExpedient: '/expediente/',
    UpdateExpediente: '/expediente'
  };

}
