import { Component, OnInit } from '@angular/core';
import { Interests } from '../models/interests/interests.model';
import { InterestsService } from '../services/interests-service/interests.service';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent implements OnInit {
  interestsList: Interests[] = [];
  myInterest: Interests = new Interests();
  btntxt: string = 'Agregar';
  editId: string | null = null;

  constructor(private interestsService: InterestsService) {}

  ngOnInit(): void {
    this.interestsService.getInterests().subscribe(data => {
      this.interestsList = data;
    });
  }

  saveInterest(): void {
    if (this.editId) {
      this.interestsService.updateInterest(this.editId, this.myInterest).then(() => {
        this.resetForm();
      });
    } else {
      this.interestsService.addInterest(this.myInterest).then(() => {
        this.resetForm();
      });
    }
  }

  editInterest(interest: Interests): void {
    this.myInterest = { ...interest };
    this.editId = interest.id ?? null;
    this.btntxt = 'Actualizar';
  }

  deleteInterest(id?: string): void {
    if (!id) return;
    this.interestsService.deleteInterest(id);
  }

  resetForm(): void {
    this.myInterest = new Interests();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}

  


