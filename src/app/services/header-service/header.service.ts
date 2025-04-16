import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/Header';
  private headerRef: AngularFirestoreCollection<Header>;

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  // ✅ Obtener header como observable directamente
  getHeader(): Observable<Header[]> {
    return this.headerRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Header;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  

  // ✅ Actualizar encabezado por ID
  updateHeader(id: string, data: Partial<Header>): Promise<void> {
    return this.headerRef.doc(id).update(data);
  }
}
