import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";


@Injectable({providedIn: "root"})
export class DataStorageService{

    firebaseRecipesUrl = "https://angular-recipe-course-38a2c-default-rtdb.firebaseio.com/recipes.json"

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ){}
    
    // interceptor dodaje tokene za autorizaciju
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http.put(this.firebaseRecipesUrl, recipes).subscribe(
          responseData => console.log(responseData)
        );
    }

    // new look with exhaustMap // new look again with interceptors
    fetchRecipes(){
       
        return this.http.get<Recipe[]>(this.firebaseRecipesUrl,).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })}),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                }) 
            )
    }



    
}