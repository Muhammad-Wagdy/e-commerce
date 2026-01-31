// skeleton-loader.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  standalone: true
})
export class SkeletonLoaderComponent {
  @Input() count: number = 8;

  get skeletonArray() {
    return Array(this.count).fill(0);
  }
}
