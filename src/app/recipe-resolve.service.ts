import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipes/recipe.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: "root"})
export class RecipeResolveService implements Resolve<Recipe[]>{
    constructor(private dataStorageService : DataStorageService, private recipeService :RecipeService){};
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length < 1){
            return this.dataStorageService.fetchData();
        }
        else return recipes;
    }

}