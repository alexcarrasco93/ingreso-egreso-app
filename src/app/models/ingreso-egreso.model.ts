export class IngresoEgreso {
  uid?: string;

  constructor(
    public descripcion: string,
    public monto: number,
    public tipo: string,
    // public uid?: string
  ) {}
}
