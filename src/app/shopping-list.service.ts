import { Ingredient } from './shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  ingredientsChangeSubject = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  createShoppingList(ingredient: Ingredient) {
    console.log(this.ingredients);
    this.ingredients.push(ingredient);
  }
  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientsChangeSubject.next(this.ingredients)
  }
  getIngredients(index: number){
    return this.ingredients[index];
  }
  updateIngredients(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient 
    this.ingredientsChangeSubject.next(this.ingredients.slice());
  }
  deleteIngredients(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChangeSubject.next(this.ingredients.slice());
  }
}
