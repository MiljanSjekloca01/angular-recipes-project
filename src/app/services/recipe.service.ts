import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root"})
export class RecipeService{
    constructor(private slService:ShoppingListService){}

    recipesChanged = new Subject<Recipe[]>
  /*
    private recipes: Recipe[] = [ // Array of Recipes Niz Recepata
    new Recipe("Schnitzel","A super-tasty schnitzel - just awesome!",
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
    [
      new Ingredient("Schnitzel meat",1),
      new Ingredient("French Fries",20),
      new Ingredient("Lemons",1)
    ]),
    new Recipe("Pork Meat","What else do you need ? ",
    "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg",
    [
      new Ingredient("Pork",1),
      new Ingredient("Lemons",2),
      new Ingredient("Tomato",10),
      new Ingredient("Onion",1)
    ])
  ]; 
  */

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  
  getRecipe(index: number){
    return this.recipes[index]
  }


  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number,newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
  

  


}