import { Directive, OnInit, Input, ElementRef, ViewChildren, QueryList, ContentChildren, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Directive({
  selector: '[appDragDropSection]',
})
// tslint:disable-next-line:directive-class-suffix
export class DragDropSection implements OnInit {


  @Output() item: any = new EventEmitter<any>();

  @Input() data: any[];
  constructor(private ele: ElementRef) {

  }
  // ngAfterViewInit() {

  ngOnInit = () => {
    let col1;
    let col2;
    let col3;
    var r1 = this.getRow();
    this.data.forEach((item, i) => {
      this.item.emit(item);
      switch (i) {
        case 0: {
          col1 = this.getCol(3);
          const inrow = this.getRow();
          inrow.style.cssText = 'min-height: 150px;background-color:#20328a;margin: 5px';
          col1.appendChild(inrow);
          break;
        }
        case 1: {
          col2 = this.getCol(6);
          const inrow = this.getRow();
          inrow.style.cssText = 'min-height: 300px;background-color:#20328a;margin: 5px';
          col2.appendChild(inrow);

          break;

        }
        case 2: {
          col3 = this.getCol(3);
          const inrow = this.getRow();
          inrow.style.cssText = 'min-height: 150px;background-color:#20328a;margin: 5px';
          col3.appendChild(inrow);

          break;

        }
        case 3: {
          const inrow = this.getRow();
          inrow.style.cssText = 'min-height: 150px;background-color:#20328a;margin: 5px';
          col1.appendChild(inrow);

          break;

        }
        case 4: {
          const inrow = this.getRow();
          inrow.style.cssText = 'min-height: 150px;background-color:#20328a;margin: 5px';
          col3.appendChild(inrow);

          break;

        }
      }
    });
    if (col1) {
      r1.appendChild(col1);
    }
    if (col2) {
      r1.appendChild(col2);
    }
    if (col3) {
      r1.appendChild(col3);
    }
    this.ele.nativeElement.appendChild(r1);

  }
  getRow = () => {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
  }

  getCol = (col: number) => {
    const column = document.createElement('div');
    column.setAttribute('cdkDrag', '')
    column.classList.add('col');
    column.classList.add('s' + col);
    column.classList.add('m' + col);
    column.classList.add('l' + col);
    return column;
  }
}
