import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{

  constructor() { }
  ingredientsChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] =  [
    new Ingredient("Apples",5),
    new Ingredient("Tomatos",10),
    new Ingredient("Cucumber",1)
  ];


  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index: number): Ingredient{
    return this.ingredients[index]
  }

  updateIngredient(index: number,newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}



 /* Mogli bit rijesenje al previse emitova
  addIngredients(ingredients: Ingredient[]){
    for(let ingredient of ingredients){
      this.addIngredient(ingredient)}}}
  */
  
  // Ja bi napravio novi prazni niz samo sa ingredientima
  // Koje ima taj recepat this.ingredients = ingredients
  // i tako rijesio problem i duplikovanja