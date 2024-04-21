import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [`form{margin:2rem 0;}
  input.ng-invalid.ng-touched,
  textarea.ng-invalid.ng-touched{ border: 1px solid lightcoral}`]
})
export class RecipeEditComponent {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router){}

  ngOnInit(){
    this.route.params.subscribe( params => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    })
  }

  onCancel(){
    this.router.navigate([".."],{relativeTo: this.route})
  }

  onSubmit(){
   /*
   Mozemo koristiti this.recipeForm.value jer je objekat
   koji dobijamo u formi identican receptu.
   
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );*/

    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.router.navigate([".."],{relativeTo: this.route})
    // ili this.onCancel() 
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl("",Validators.required),
        "amount": new FormControl("",[Validators.required,Validators.min(1)])
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
    
  }

  private initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe["ingredients"]){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              "name": new FormControl(ingredient.name,Validators.required),
              "amount": new FormControl(ingredient.amount,[Validators.required,Validators.min(1)])
            })
          )
        }
      }

    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName,Validators.required),
      "imagePath": new FormControl(recipeImagePath,Validators.required),
      "description": new FormControl(recipeDescription,[Validators.required,Validators.minLength(10)]),
      "ingredients": recipeIngredients
    })
  }

  get controls(){
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }


  /* ili ovako
  getControls(){
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }
  pa let ingredientControl of getControls()
  */

}
