import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent implements OnInit {
  educationList: Education[] = [];
  myEducation: Education = new Education();
  btntxt: string = 'Agregar';
  editId: string | null = null;

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
    });
  }

  saveEducation(): void {
    if (this.editId) {
      this.educationService.updateEducation(this.editId, this.myEducation).then(() => {
        this.resetForm();
      });
    } else {
      this.educationService.addEducation(this.myEducation).then(() => {
        this.resetForm();
      });
    }
  }

  editEducation(edu: Education): void {
    this.myEducation = { ...edu };
    this.editId = edu.id ?? null;
    this.btntxt = 'Actualizar';
  }

  deleteEducation(id?: string): void {
    if (!id) return;
    this.educationService.deleteEducation(id);
  }

  resetForm(): void {
    this.myEducation = new Education();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
