import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  templateUrl: './skeleton-loader.component.html',
})
export class SkeletonLoaderComponent {
  skeletonArray= Array.from({length:8})
  @Input() count = 8;
@Input() columns = 'xl:grid-cols-4';
}
