import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"])
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activeRoute });
  }
  onAddToShoppingList() {
    this.recipeService.addIngredients(this.currentRecipe.ingredients);
  }
  currentRecipe = new Recipe('', '', '', []);
  recipeService: RecipeService;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.recipeService = inject(RecipeService);
  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((param: Params) => {
        this.id = +param['id'];
      this.currentRecipe = this.recipeService.getRecipe(+param['id']);
    });
  }
  id: number = 0;
}
