import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';
import {  ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy{

  recipes: Recipe[];
  private recipesSubscription: Subscription;

  constructor(private recipeService:RecipeService,
    private router:Router,
    private route:ActivatedRoute,
    private dStorageService: DataStorageService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipesSubscription = this.recipeService.recipesChanged.subscribe(
      newRecipes => {  // (recipes: Recipe[])
        this.recipes = newRecipes;
      }
    )

    
  }
  
  onNewRecipeClicked(){
    this.router.navigate(["new"],{relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe()
  }
}
