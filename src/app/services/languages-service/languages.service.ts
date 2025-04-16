import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/Languages';
  private languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private firestore: AngularFirestore) {
    this.languagesRef = firestore.collection<Languages>(this.dbPath);
  }

  getLanguages(): Observable<Languages[]> {
    return this.languagesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as Languages;
          const id = c.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addLanguage(language: Languages): Promise<any> {
    const { id, ...langData } = language;
    return this.languagesRef.add(langData);
  }    

  deleteLanguage(id: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }

  updateLanguage(id: string, data: Partial<Languages>): Promise<void> {
    return this.languagesRef.doc(id).update(data);
  }
}
