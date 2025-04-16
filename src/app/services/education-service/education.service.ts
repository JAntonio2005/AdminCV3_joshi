import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Education } from '../../models/education/education.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/Education';
  private educationRef: AngularFirestoreCollection<Education>;

  constructor(private firestore: AngularFirestore) {
    this.educationRef = firestore.collection<Education>(this.dbPath);
  }

  getEducation(): Observable<Education[]> {
    return this.educationRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as Education;
          const id = c.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addEducation(data: Education): Promise<any> {
    const { id, ...cleanData } = data;
    return this.educationRef.add(cleanData);
  }

  updateEducation(id: string, data: Partial<Education>): Promise<void> {
    return this.educationRef.doc(id).update(data);
  }

  deleteEducation(id: string): Promise<void> {
    return this.educationRef.doc(id).delete();
  }
}
