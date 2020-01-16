import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {EstudianteRoutingModule} from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';

@NgModule({
  declarations: [EstudianteComponent],
  imports: [
    CommonModule, EstudianteRoutingModule, FormsModule, NgbModule
  ]
})
export class EstudianteModule { }
