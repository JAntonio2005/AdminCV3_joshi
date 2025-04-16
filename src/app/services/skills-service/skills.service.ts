import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/Skills';
  private skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private firestore: AngularFirestore) {
    this.skillsRef = firestore.collection<Skills>(this.dbPath);
  }

  getSkills(): Observable<Skills[]> {
    return this.skillsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
          const data = c.payload.doc.data() as Skills;
          const id = c.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addSkill(skill: Skills): Promise<any> {
    const { id, ...cleanSkill } = skill;
    return this.skillsRef.add(cleanSkill);
  }

  updateSkill(id: string, data: Partial<Skills>): Promise<void> {
    return this.skillsRef.doc(id).update(data);
  }

  deleteSkill(id: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}
