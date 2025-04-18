import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent implements OnInit {
  languages: Languages[] = [];
  myLanguages: Languages = new Languages();
  btntxt: string = 'Agregar';
  editId: string | null = null;

  constructor(private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.languagesService.getLanguages().subscribe(data => {
      this.languages = data;
    });
  }

  AgregarJob(): void {
    if (this.editId) {
      this.languagesService.updateLanguage(this.editId, this.myLanguages).then(() => {
        this.resetForm();
      });
    } else {
      this.languagesService.addLanguage(this.myLanguages).then(() => {
        this.resetForm();
      });
    }
  }

  updateJob(id: string | undefined): void {
    const item = this.languages.find(lang => lang.id === id);
    if (item) {
      this.myLanguages = { ...item };
      this.editId = item.id ?? null;
      this.btntxt = 'Actualizar';
    }
  }

  deleteJob(id?: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && id) {
        this.languagesService.deleteLanguage(id);
        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
      }
    });
  }
  resetForm(): void {
    this.myLanguages = new Languages();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
