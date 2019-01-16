import { Injectable } from '@angular/core';

import { Story } from './story.model';

@Injectable({ providedIn: 'root' })
export class StoriesService {
  private stories: Story[] = [];

  getStories() {
    return [...this.stories];
  }

  addPost(title: string, content: string) {
    const story: Story = { id: null, title: title, content: content };
    this.stories.push(story);
  }
}
