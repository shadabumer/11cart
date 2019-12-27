import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'item-list',
    loadChildren: () => import('./pages/items/item-list/item-list.module').then( m => m.ItemListPageModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/items/item-details/item-details.module').then( m => m.ItemDetailsPageModule),
    canActivate:[AngularFireAuthGuard]
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
