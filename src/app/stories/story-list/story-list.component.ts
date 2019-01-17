import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { Story } from '../story.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];
  isLoading = false;
  private storiesSub: Subscription;

  constructor(public storiesService: StoriesService) {}

  ngOnInit() {
    this.isLoading = true;
    this.storiesService.getStories();
    this.storiesSub = this.storiesService
      .getStoryUpdateListener()
      .subscribe((stories: Story[]) => {
        this.isLoading = false;
        this.stories = stories;
      });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.storiesService.deleteStory(postId);
  }
}

