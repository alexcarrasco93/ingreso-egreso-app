import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user?.uid;
    return this.firestore
      .doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListner(uid: string | undefined) {
    return this.firestore
      .collection<IngresoEgreso>(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data(),
          }))
        )
      );
  }

  borrarIngresoEgreso(uidItem: string | undefined) {
    const uid = this.authService.user?.uid;
    return this.firestore
      .doc(`${uid}/ingreso-egreso/items/${uidItem}`)
      .delete();
  }
}
