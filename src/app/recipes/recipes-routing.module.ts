import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "../auth/auth.guard"
import { RecipesResolverService } from "../services/recipes-resolver.service"
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component"
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component"
import { RecipeStartComponent } from "./recipe-start/recipe-start.component"
import { RecipesComponent } from "./recipes.component"
import { NgModule } from "@angular/core"


// on je stavio na id i edit resolver ja na sve.

const routes: Routes = [
    {path: "", 
     canActivate:[AuthGuard],
     component: RecipesComponent,
     children:[
        {path: "",component: RecipeStartComponent},
        {path: "new",component: RecipeEditComponent},
        {path: ":id",component: RecipeDetailComponent},
        {path: ":id/edit",component: RecipeEditComponent},
        
    ],
    resolve: { RecipesResolverService },
    },
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[ RouterModule ]
})

export class RecipesRoutingModule{}