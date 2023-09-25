import { Ingredient } from 'src/app/shared/ingredient.model';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  onEdit(index: number) {
    this.shoppingListService.startEditing.next(index);
  }
  shoppingListService: ShoppingListService;
  ingredients: Ingredient[] = [];
  private ingredientChangeSubcription: Subscription = new Subscription();
  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }
  ngOnDestroy(): void {
    this.ingredientChangeSubcription.unsubscribe();
  }
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    this.ingredientChangeSubcription =
      this.shoppingListService.ingredientsChangeSubject.subscribe(
        (ingredients) => (this.ingredients = ingredients)
      );
  }
}
