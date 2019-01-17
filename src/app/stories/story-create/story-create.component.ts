import { Component } from '@angular/core';
import { Story } from '../story.model';
import { StoriesService } from '../stories.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.scss']
})
export class StoryCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  story: Story;

  constructor(public storiesService: StoriesService) {}

  onSaveStory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.storiesService.addPost(form.value.title, form.value.content);

    form.resetForm();
  }
}
