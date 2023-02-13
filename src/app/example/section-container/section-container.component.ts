import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  createInput,
  InputContainerComponent,
  InputType,
} from '../input-container/input-container.component';

export type SectionType = InputType[];

export function createSection(): SectionType {
  return [createInput()];
}

@Component({
  selector: 'app-section-container',
  standalone: true,
  imports: [CommonModule, InputContainerComponent],
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.scss'],
})
export class SectionContainerComponent implements OnInit {
  @Input() no!: number;
  @Input() data!: SectionType;
  @Input() removable: boolean = true;

  @Output() remove = new EventEmitter<void>();
  @Output() dataChanged = new EventEmitter<SectionType | null>();
  ngOnInit(): void {
    if (!this.data || !this.no) {
      throw new Error('value an no properties must be speficied');
    }
  }

  removeChild(index: number): void {
    this.data.splice(index, 1);
  }

  OnRemove(): void {
    this.remove.emit();
    this.dataChanged.emit(null);
  }

  OnAdd(): void {
    this.data.push(createInput());
    this.dataChanged.emit(null);
  }

  onChanged(): void {
    this.dataChanged.emit(this.data);
  }

  getResult(): number {
    return this.data
      .map((item) => item.value)
      .reduce((carely, value) => carely + value, 0);
  }
}
