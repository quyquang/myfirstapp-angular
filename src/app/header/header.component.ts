import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  logout() {
    this.authService.userSubject.next(new User());
    this.isAuthenticated = false;
  }
  userSub: Subscription = new Subscription();
  isAuthenticated: boolean = false;

  onFetchData() {
    this.dataStorageService.fetchData().subscribe();
  }
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe((user) => {
      this.isAuthenticated = !!user?.id;
      console.log(this.isAuthenticated, 'authen');
    });
  }
  onSaveData() {
    this.dataStorageService.storeData();
  }
}
