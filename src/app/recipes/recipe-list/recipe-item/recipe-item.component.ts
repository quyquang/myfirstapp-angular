import { Component, Injectable, Input, inject } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
@Injectable()
export class RecipeItemComponent {
  @Input() recipe: Recipe = new Recipe('', '', '', []);

  recipeService: RecipeService;
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.recipeService = inject(RecipeService);
  }
}
