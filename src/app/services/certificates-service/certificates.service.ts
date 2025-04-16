import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/Certificates';
  private certRef: AngularFirestoreCollection<Certificates>;

  constructor(private firestore: AngularFirestore) {
    this.certRef = firestore.collection<Certificates>(this.dbPath);
  }

  getCertificates(): Observable<Certificates[]> {
    return this.certRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as Certificates;
          const id = c.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addCertificate(cert: Certificates): Promise<any> {
    const { id, ...cleanData } = cert;
    return this.certRef.add(cleanData);
  }

  updateCertificate(id: string, data: Partial<Certificates>): Promise<void> {
    return this.certRef.doc(id).update(data);
  }

  deleteCertificate(id: string): Promise<void> {
    return this.certRef.doc(id).delete();
  }
}
