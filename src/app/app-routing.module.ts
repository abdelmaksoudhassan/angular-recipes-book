import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Auth2Guard } from './auth2.guard';
import { RecipesModule } from './recipes/recipes-module';
import { authModule } from './auth/auth-module';
import { shoppingListModule } from './shopping-list/shopping-list-module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path:'recipes',
    // loadChildren:'./recipes/recipes-module#RecipesModule'
    loadChildren:()=>RecipesModule
  },
  {
    path:'auth',
    // loadChildren:'./auth/auth-module#authModule',
    loadChildren:()=>authModule,
    canActivate:[Auth2Guard]
  },
  {
    path: 'shopping-list',
    // loadChildren:'./shopping-list/shopping-list-module#shoppingListModule' 
    loadChildren:()=>shoppingListModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
