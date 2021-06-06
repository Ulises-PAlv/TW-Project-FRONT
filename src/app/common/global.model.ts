// ?? AQUI IRAN VARIABLES QUE REQUIERAN SER GLOBALES & MODELOS ###

export class GlobalModel {
  public static apiURL: string = 'http://localhost:3000';

  public static querysUsers = {
    GetAll: '/user',
    GetID: '/user/',
    PostUsr: '/registro',
    Correo: '/correo/',
    Aux: '/user/'
  };

}
