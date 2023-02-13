import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExampleDataService } from '../../example-data.service';
import {
  createSection,
  SectionContainerComponent,
  SectionType,
} from '../../section-container/section-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SectionContainerComponent],
  templateUrl: './example-input-page.component.html',
  styleUrls: ['./example-input-page.component.scss'],
})
export class ExampleInputPageComponent {
  title = 'my-ng3';

  data!: SectionType[];

  constructor(private dataService: ExampleDataService) {
    this.data = dataService.load();
  }

  private storeData(): void {
    this.dataService.save(this.data);
  }

  OnAdd(): void {
    this.data.push(createSection());
    this.storeData();
  }

  onChanged(): void {
    this.storeData();
  }

  removeChild(index: number): void {
    this.data.splice(index, 1);
    this.storeData();
  }
}
