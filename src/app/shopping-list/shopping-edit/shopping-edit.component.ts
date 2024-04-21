import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{

  editingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild("f",{static: false})
  myForm: NgForm;

  constructor(private shoppingListService:ShoppingListService){}

  ngOnInit() {
    this.editingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.myForm.setValue({
          "name": this.editedItem.name,
          "amount": this.editedItem.amount
        })
      }
    )
  }
  // ili preko viewChild 
  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
    }else this.shoppingListService.addIngredient(newIngredient);
    /*  Umjesto ovoga moze this.onClear()
    this.editMode = false;
    this.myForm.reset();*/
    this.onClear();

  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.myForm.reset();
  }


  ngOnDestroy(){
    this.editingSubscription.unsubscribe()
  }
}
