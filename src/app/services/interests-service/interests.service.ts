import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/Interests';
  private interestsRef: AngularFirestoreCollection<Interests>;

  constructor(private firestore: AngularFirestore) {
    this.interestsRef = firestore.collection<Interests>(this.dbPath);
  }

  getInterests(): Observable<Interests[]> {
    return this.interestsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as Interests;
          const id = c.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addInterest(data: Interests): Promise<any> {
    const { id, ...cleanData } = data;
    return this.interestsRef.add(cleanData);
  }

  updateInterest(id: string, data: Partial<Interests>): Promise<void> {
    return this.interestsRef.doc(id).update(data);
  }

  deleteInterest(id: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}
