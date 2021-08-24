export class Usuario {
  constructor(
    public uid: string | undefined,
    public nombre: string,
    public email: string | undefined | null
  ) {}
}
