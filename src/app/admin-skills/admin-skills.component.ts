import { Component, OnInit } from '@angular/core';
import { Skills } from '../models/skills/skills.model';
import { SkillsService } from '../services/skills-service/skills.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent implements OnInit {
  skillsList: Skills[] = [];
  mySkill: Skills = new Skills();
  btntxt: string = 'Agregar';
  editId: string | null = null;

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe(data => {
      this.skillsList = data;
    });
  }

  saveSkill(): void {
    if (this.editId) {
      this.skillsService.updateSkill(this.editId, this.mySkill).then(() => {
        this.resetForm();
      });
    } else {
      this.skillsService.addSkill(this.mySkill).then(() => {
        this.resetForm();
      });
    }
  }

  editSkill(skill: Skills): void {
    this.mySkill = { ...skill };
    this.editId = skill.id ?? null;
    this.btntxt = 'Actualizar';
  }

  deleteSkill(id?: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el registro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed && id) {
        this.skillsService.deleteSkill(id);
        Swal.fire('Eliminado', 'El registro ha sido eliminado.', 'success');
      }
    });
  }
  

  resetForm(): void {
    this.mySkill = new Skills();
    this.editId = null;
    this.btntxt = 'Agregar';
  }
}
