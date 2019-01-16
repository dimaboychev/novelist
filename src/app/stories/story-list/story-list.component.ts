import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { Story } from '../story.model';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories: Story[] = [];

  constructor(public storiesService: StoriesService) {}

  ngOnInit() {
    this.stories = this.storiesService.getStories();
  }
}
