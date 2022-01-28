import { Component, Input } from '@angular/core';

@Component({
  selector: 'baskt-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() skeletonShape!: string;
  @Input() skeletonSize!: string;

}
