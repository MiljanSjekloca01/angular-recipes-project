import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private sLs:ShoppingListService,
    private recipeService: RecipeService,
    private route:ActivatedRoute,
    private router:Router){
    }
    
  addToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipeById(
    //   +this.route.snapshot.params["id"]
    //  inicijalizacija,ali posto ce se mijenjati na stranici -> )
    this.route.params.subscribe(
      params => {
        this.id = +params["id"];
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
  }

  onEditRecipe(){
    this.router.navigate(["edit"],{relativeTo: this.route})
    // this.router.navigate(["../"",this.id,"edit"],{relativeTo: this.route})
    // ako bi kreirali id parametar 
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate([".."],{relativeTo: this.route});
  }

}
