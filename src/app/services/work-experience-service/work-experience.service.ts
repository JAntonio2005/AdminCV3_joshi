import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/models/work-experience.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/WorkExperience';
  private workRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private firestore: AngularFirestore) {
    this.workRef = this.firestore.collection<WorkExperience>(this.dbPath);
  }

  getWorkExperience(): Observable<WorkExperience[]> {
    return this.workRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as WorkExperience;
          const id = c.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addWorkExperience(data: WorkExperience): Promise<any> {
    const { id, ...cleanData } = data;
    return this.workRef.add(cleanData);
  }

  updateWorkExperience(id: string, data: Partial<WorkExperience>): Promise<void> {
    return this.workRef.doc(id).update(data);
  }

  deleteWorkExperience(id: string): Promise<void> {
    return this.workRef.doc(id).delete();
  }
}
