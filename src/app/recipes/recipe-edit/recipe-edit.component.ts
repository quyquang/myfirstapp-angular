import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  onDeleteIngredient(index: number) {
    console.log('here', this.recipeForm.get('ingredients'));
    (<FormArray>this.recipeForm.get('ingredients'))?.removeAt(index)
  }
  onDelete() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }
  addNewIngredient() {
    const ingredient = new FormGroup({
      name: new FormControl(null),
      amount: new FormControl(null),
    });
    console.log('here', this.recipeForm.get('ingredients'));
    (<FormArray>this.recipeForm.get('ingredients'))?.push(ingredient);
  }
  getIngredients(): any {
    const result = (<FormArray>this.recipeForm.get('ingredients'))?.controls;
    return result;
  }
  onSubmit() {
    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else this.recipeService.addRecipe(this.recipeForm.value);
    this.onDelete();
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
    });
  }
  initForm() {
    let rpName = '';
    let rpImagePath = '';
    let rpDescription = '';
    let rpIngredients: FormGroup[] = [];
    // let rpIngredients = new FormArray([new FormGroup({name: new FormControl(null), amount: new FormControl(null)})]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      console.log('recipe', recipe);
      rpName = recipe.name;
      rpImagePath = recipe.imagePath;
      rpDescription = recipe.description;
      for (let ingredient of recipe?.ingredients) {
        const formGroup: FormGroup = new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(
            ingredient.amount,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ),
        });
        rpIngredients.push(formGroup);
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(rpName, Validators.required),
      imagePath: new FormControl(rpImagePath, Validators.required),
      description: new FormControl(rpDescription, Validators.required),
      ingredients: new FormArray(rpIngredients),
    });
    console.log(this.recipeForm, 'quang');
  }
  id: number = -1;
  editMode: boolean = false;
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    imagePath: new FormControl(null),
    description: new FormControl(null),
    ingredients: new FormArray([]),
  });
}
