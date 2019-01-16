import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryCreateComponent } from './stories/story-create/story-create.component';
import { StoryListComponent } from './stories/story-list/story-list.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 'create', component: StoryCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
