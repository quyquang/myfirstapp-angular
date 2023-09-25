import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subcription = new Subscription();
  onNew() {
    this.router.navigate(['new'], { relativeTo: this.activeRoute });
  }
  recipeService: RecipeService;
  activeRoute: ActivatedRoute;
  router: Router;
  recipes: Recipe[] = [];
  constructor() {
    this.recipeService = inject(RecipeService);
    this.activeRoute = inject(ActivatedRoute);
    this.router = inject(Router);
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.recipes;
    this.subcription = this.recipeService.recipeChange.subscribe(
      (rp: Recipe[]) => {
        this.recipes = rp;
      }
    );
  }
}
