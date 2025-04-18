import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/models/work-experience.models';
import Swal from 'sweetalert2';
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



deleteExperience(id: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el registro permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.workService.deleteWorkExperience(id);
      Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
    }
  });
}

  resetForm(): void {
    this.myExperience = new WorkExperience();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
