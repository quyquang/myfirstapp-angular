import { Injectable, inject } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  setData(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChange.next(this.recipes)
  }
  shoppingListService: ShoppingListService;
  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }
  recipeChange = new Subject<Recipe[]>();
  recipes: Recipe[] = [
    // new Recipe(
    //   'Cơm gà',
    //   'Cơm gà Tam Kỳ ngon dễ sợ',
    //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbyaht_ArecJ2qDIHbWBjj-G9ZEi4Hjq-M7SCQ7irSCDsFlyQ_uc46XbHLFrIEgJSnUQ&usqp=CAU',
    //   [new Ingredient('gà', 1), new Ingredient('hành', 2)],
    //   1
    // ),
    // new Recipe(
    //   'Bún bò Huế',
    //   'Cay ngon quá',
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Bun-Bo-Hue-from-Huong-Giang-2011.jpg/1200px-Bun-Bo-Hue-from-Huong-Giang-2011.jpg',
    //   [new Ingredient('bò', 1), new Ingredient('ớt', 2)],
    //   2
    // ),
  ];
  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  getRecipes() {
    return this.recipes;
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes);
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChange.next(this.recipes);
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChange.next(this.recipes.slice());
  }
}
