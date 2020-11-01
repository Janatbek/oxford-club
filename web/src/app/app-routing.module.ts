import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StockResolverService } from './resolver/stock-resolver.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    pathMatch: 'full'
  },
  {
    path: 'stocks/:symbol',
    resolve: {
      stock: StockResolverService
    },
    loadChildren: () => import('./stock-details/stock-details.module').then( m => m.StockDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./settings/setting/setting.module').then( m => m.SettingPageModule)
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
