import { Component, OnInit } from '@angular/core';
import { Certificates } from '../models/certificates/certificates.model';
import { CertificatesService } from '../services/certificates-service/certificates.service';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent implements OnInit {
  certificates: Certificates[] = [];
  myCertificate: Certificates = new Certificates();
  btntxt: string = 'Agregar';
  editId: string | null = null;

  constructor(private certificateService: CertificatesService) {}

  ngOnInit(): void {
    this.certificateService.getCertificates().subscribe(data => {
      this.certificates = data;
    });
  }

  saveCertificate(): void {
    if (this.editId) {
      this.certificateService.updateCertificate(this.editId, this.myCertificate).then(() => {
        this.resetForm();
      });
    } else {
      this.certificateService.addCertificate(this.myCertificate).then(() => {
        this.resetForm();
      });
    }
  }

  editCertificate(cert: Certificates): void {
    this.myCertificate = { ...cert };
    this.editId = cert.id ?? null;
    this.btntxt = 'Actualizar';
  }

  deleteCertificate(id?: string): void {
    if (!id) return;
    this.certificateService.deleteCertificate(id);
  }

  resetForm(): void {
    this.myCertificate = new Certificates();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
