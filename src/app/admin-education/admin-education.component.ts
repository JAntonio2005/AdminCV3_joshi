import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && id) {
        this.educationService.deleteEducation(id);
        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
      }
    });
  }
  resetForm(): void {
    this.myEducation = new Education();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
