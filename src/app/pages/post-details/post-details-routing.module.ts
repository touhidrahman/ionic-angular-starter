import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PostDetailsPage } from './post-details.page'

const routes: Routes = [
    {
        path: '',
        component: PostDetailsPage,
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostDetailsPageRoutingModule {}
