import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthGuard} from '../shared/guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard-matricula',
                loadChildren: () =>
                    import('./matriculacion/matricula/dashboard/dashboard-matricula.module')
                        .then(m => m.DashboardMatriculaModule), canActivate: [AuthGuard]
            },
            {
                path: 'dashboard-cupo',
                loadChildren: () => import('./matriculacion/cupo/dashboard/dashboard-cupo.module').then(m => m.DashboardCupoModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'estudiante',
                loadChildren: () => import('./notas/estudiante/estudiante.module')
                    .then(m => m.EstudianteModule), canActivate: [AuthGuard]
            },
            {
                path: 'matricula',
                loadChildren: () => import('./matriculacion/matricula/matricula.module').then(m => m.MatriculaModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'cupos',
                loadChildren: () => import('./matriculacion/cupo/cupo.module').then(m => m.CupoModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'ajustes',
                loadChildren: () => import('./matriculacion/ajuste/ajuste.module').then(m => m.AjusteModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./matriculacion/usuario/usuario.module').then(m => m.UsuarioModule),
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
