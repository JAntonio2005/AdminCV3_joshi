import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/models/work-experience.models';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent implements OnInit {
  workExperiences: WorkExperience[] = [];
  myExperience: WorkExperience = new WorkExperience();
  btntxt: string = 'Agregar';
  editId: string | null = null;

  constructor(private workService: WorkExperienceService) {}

  ngOnInit(): void {
    this.workService.getWorkExperience().subscribe(data => {
      this.workExperiences = data;
    });
  }

  saveExperience(): void {
    if (this.editId) {
      this.workService.updateWorkExperience(this.editId, this.myExperience).then(() => {
        this.resetForm();
      });
    } else {
      this.workService.addWorkExperience(this.myExperience).then(() => {
        this.resetForm();
      });
    }
  }

  editExperience(exp: WorkExperience): void {
    this.myExperience = { ...exp };
    this.editId = exp.id ?? null;
    this.btntxt = 'Actualizar';
  }

  deleteExperience(id?: string): void {
    if (!id) return;
    this.workService.deleteWorkExperience(id);
  }

  resetForm(): void {
    this.myExperience = new WorkExperience();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
