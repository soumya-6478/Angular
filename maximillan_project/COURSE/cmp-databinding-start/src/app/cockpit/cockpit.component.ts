import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();
  @Output() blueprintCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();
  @ViewChild('cntentInput') contentName: ElementRef;

  // newServerName = '';
  // newServerContent = '';

  constructor() {}

  ngOnInit(): void {}

  onAddServer(input: HTMLInputElement) {
    console.log(this.contentName.nativeElement.value);
    // console.log(input);
    this.serverCreated.emit({
      name: input.value,
      content: this.contentName.nativeElement.value,
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit();
  }
}
