import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule.forChild(
            [{path: "", component: ShoppingListComponent},]
        )
    ],
    // Kreirali smo rutu za ShoppingList pa nemora export
    // Takodje ShoppingEdit se ne koristi nidje drugde kao komponenta
    // Tako da ne mora da se koristi export
})

export class ShoppingListModule{}