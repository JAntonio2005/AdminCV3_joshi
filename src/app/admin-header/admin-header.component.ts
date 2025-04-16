import { Component, OnInit } from '@angular/core';
import { Header } from '../models/header/header.model';
import { HeaderService } from '../services/header-service/header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  header: Header = new Header();
  btntxt: string = 'Guardar cambios';

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.getHeader().subscribe(data => {
      this.header = data[0]; // ya es un array de headers
    });
  }

  updateHeader(): void {
    if (!this.header.id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esto actualizará los datos del encabezado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.headerService.updateHeader(this.header.id!, {
          name: this.header.name,
          goalLife: this.header.goalLife,
          photoUrl: this.header.photoUrl,
          email: this.header.email,
          phoneNumber: this.header.phoneNumber,
          location: this.header.location,
          socialNetwork: this.header.socialNetwork
        });
      
        Swal.fire('Actualizado', 'El encabezado fue actualizado con éxito.', 'success');
      }
    });
  }
}
