import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolveService } from './recipe-resolve.service';
import { AuthComponent } from './auth/auth.component';
export const ROUTES: Routes = [
  { path: '', redirectTo: 'recipes',  pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children:[
    {path: '', component: RecipeStartComponent, pathMatch: 'full' },
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolveService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolveService]}
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
