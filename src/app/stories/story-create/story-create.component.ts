import { Component } from '@angular/core';
import { Story } from '../story.model';
import { StoriesService } from '../stories.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.scss']
})
export class StoryCreateComponent {
  isLoading = false;
  isLoadingImages = false;
  story: Story;
  private imagesSub: Subscription;
  images: any = [];
  imagesTransformed = [];

  constructor(public storiesService: StoriesService) {}

  onSaveStory(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const selectedImage = this.images.filter(
      image => image.id === form.value.imageRadio
    );
    this.storiesService.addStory(
      form.value.title,
      selectedImage[0].id,
      selectedImage[0].url,
      selectedImage[0].urlThumb,
      form.value.content
    );

    form.resetForm();
  }

  chunk(arr, size) {
    for (let i = 0; i < arr.length; i += size) {
      this.imagesTransformed.push(arr.slice(i, i + size));
    }
  }

  onImageSearch(query: string) {
    this.isLoadingImages = true;
    this.storiesService.getImages(query);
    this.imagesSub = this.storiesService
      .getImageUpdateListener()
      .subscribe(images => {
        this.isLoadingImages = false;
        this.images = [];
        this.images = images;
        this.imagesTransformed = [];
        this.chunk(images, 3);
      });
  }
}
