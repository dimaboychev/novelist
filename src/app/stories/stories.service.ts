import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Story } from './story.model';

@Injectable({ providedIn: 'root' })
export class StoriesService {
  private stories: Story[] = [];
  private storiesUpdated = new Subject<Story[]>();
  images = [];
  private imagesUpdated = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  getStories() {
    this.http
      .get<{ message: string; stories: any }>(
        'http://localhost:3000/api/stories'
      )
      .pipe(
        map(storyData => {
          return storyData.stories.map(story => {
            return {
              title: story.title,
              imageUrl: story.imageUrl,
              content: story.content,
              id: story._id
            };
          });
        })
      )
      .subscribe(transformedStories => {
        this.stories = transformedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }

  getStoryUpdateListener() {
    return this.storiesUpdated.asObservable();
  }

  addStory(
    title: string,
    imageId: string,
    imageUrl: string,
    imageThumbUrl: string,
    content: string
  ) {
    const story: Story = {
      id: null,
      title: title,
      imageId: imageId,
      imageUrl: imageUrl,
      imageThumbUrl: imageThumbUrl,
      content: content
    };
    this.http
      .post<{ message: string; storyId: string }>(
        'http://localhost:3000/api/stories',
        story
      )
      .subscribe(responseData => {
        const id = responseData.storyId;
        story.id = id;
        this.stories.push(story);
        this.storiesUpdated.next([...this.stories]);
        this.router.navigate(['/']);
      });
  }

  deleteStory(storyId: string) {
    this.http
      .delete('http://localhost:3000/api/stories/' + storyId)
      .subscribe(() => {
        const updatedStories = this.stories.filter(
          story => story.id !== storyId
        );
        this.stories = updatedStories;
        this.storiesUpdated.next([...this.stories]);
      });
  }

  getImages(query: string) {
    this.http
      .get<{ message: string; results: any }>(
        `http://localhost:3000/api/stories/external-api?query=${query}`
      )
      .pipe(
        map(imageData => {
          return imageData.results.map(image => {
            return {
              id: image.id,
              url: image.urls.regular,
              urlThumb: image.urls.thumb
            };
          });
        })
      )
      .subscribe(image => {
        this.images = image;
        this.imagesUpdated.next([...this.images]);
        this.images = [];
      });
  }

  getImageUpdateListener() {
    return this.imagesUpdated.asObservable();
  }
}
