import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private DATABASE_URL = environment.firebase.databaseURL;

    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();

        return this.httpClient.put(this.DATABASE_URL + '/recipes.json',
                                this.recipeService.getRecipes(), {
                                    observe: 'body',
                                    params: new HttpParams().set('auth', token)
                                });
    }

    getRecipes() {
        const token = this.authService.getToken();

        this.httpClient.get<Recipe[]>(this.DATABASE_URL + '/recipes.json?auth=' + token)
            .pipe(map(
                (recipes) => {
                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            console.log(recipe);
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;

                }
            ))
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }

}
