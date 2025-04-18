import { Component, OnInit } from '@angular/core';
import { Interests } from '../models/interests/interests.model';
import { InterestsService } from '../services/interests-service/interests.service';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && id) {
        this.interestsService.deleteInterest(id);
        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
      }
    });
  }

  resetForm(): void {
    this.myInterest = new Interests();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}

  


