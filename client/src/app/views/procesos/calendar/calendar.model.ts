import { formatDate } from '@angular/common';
export class Calendar {
  id: number;
  titulo: string;
  categoria: string;
  fechaInicio: string;
  fechaFin: string;
  detalle: string;

  constructor(calendar) {
    {
      this.id = calendar.id || this.getRandomID();
      this.titulo = calendar.titulo || '';
      this.categoria = calendar.categoria || '';
      this.fechaInicio = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.fechaFin = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.detalle = calendar.detalle || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
