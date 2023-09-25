import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  onDelete() {
    this.shoppingListService.deleteIngredients(this.editIndex)
    this.onClear();
  }
  onClear() {
    this.form?.reset();
    this.editMode = false;
  }
  @Output() createShoppingListFire = new EventEmitter<Ingredient>();
  private selectSubcription: Subscription = new Subscription();
  editMode: boolean = false;
  private editIndex: number = -1;
  private editItem: Ingredient | undefined;
  @ViewChild('f', { static: false }) form: NgForm | undefined;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnDestroy(): void {
    this.selectSubcription.unsubscribe();
  }
  ngOnInit(): void {
    this.selectSubcription = this.shoppingListService.startEditing.subscribe(
      (value) => {
        this.editMode = true;
        this.editIndex = value;
        this.editItem = this.shoppingListService.getIngredients(this.editIndex);
        this.form?.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  onCreateShoppingList(f: NgForm) {
    const name = f.value.name;
    const amount = f.value.amount;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode)
      this.shoppingListService.updateIngredients(this.editIndex, ingredient);
    this.shoppingListService.createShoppingList(ingredient);
    this.editMode = false;
    this.form?.reset();
  }
}
