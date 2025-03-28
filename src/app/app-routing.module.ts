import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Ahora la página inicial es el login
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs', // La pantalla principal después del login
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./catalogo/catalogo.module').then( m => m.CatalogoPageModule)
  },
  {
    path: 'nuevop',
    loadChildren: () => import('./nuevop/nuevop.module').then( m => m.NuevopPageModule)
  },
  {
    path: 'more-page',
    loadChildren: () => import('./more-page/more-page.module').then( m => m.MorePagePageModule)
  },
  {
    path: 'cambiarp',
    loadChildren: () => import('./cambiarp/cambiarp.module').then( m => m.CambiarpPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'detalle-pedido',
    loadChildren: () => import('./detalle-pedido/detalle-pedido.module').then( m => m.DetallePedidoPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: '**', // Redirigir cualquier ruta no encontrada al login
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
 

 

 

 

 

 

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
