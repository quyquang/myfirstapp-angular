import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  storeData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-5c5e1-default-rtdb.firebaseio.com/recipe.json',
        recipes
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
  fetchData() {
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap((user) => {
        console.log(user,"user login")
        return this.http
          .get<Recipe[]>(
            'https://ng-recipe-5c5e1-default-rtdb.firebaseio.com/recipe.json',
            { params: new HttpParams().set('auth', user.token || '') }
          )
          .pipe(
            map((data) => {
              return data.map((res) => {
                return { ...res, ingredients: res.ingredients || [] };
              });
            }),
            tap((data) => {
                console.log("tap", data)
              this.recipeService.setData(data);
            })
          );
      })
    );
  }
}
