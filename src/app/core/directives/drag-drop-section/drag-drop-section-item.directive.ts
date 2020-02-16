import { Directive, ElementRef, Input, OnInit } from '@angular/core';


/**
 * <div class="row">
 *    <div  class="col l3 m3  card">
 *      <div class="row" style="height: 200px;background-color:#20328a;margin-top: 30px ">
 *
 *      </div>
 *      <div class="row" style="height: 200px;background-color:#20328a ">
 *
 *      </div>
 *    </div>
 *    <div class="col m6 l6">
 *      <app-card [data]="data[0]"></app-card>
 *    </div>
 *    <div class="col m3 l3 card">
 *      <div class="row" style="height: 200px;background-color:#20328a;margin-top: 30px ">
 *
 *      </div>
 *      <div class="row" style="height: 200px;background-color:#20328a ">
 *
 *      </div>
 *    </div>
 */
@Directive({
  selector: '[appDragDropSectionItem]'
})

// tslint:disable-next-line: directive-class-suffix
export class DragDropSectionItem implements OnInit {

  @Input('count') count: number;
  @Input() style: any = {};
  @Input() pattern: string = 'l-r-t-seq';

  row;
  constructor(private dragDropSectionItem: ElementRef) {
    this.row = this.getRow();
  }
  ngOnInit() {

    let col1;
    let col2;
    let col3;
    switch (this.count) {
      case 0: {
        col1 = this.getCol(3);
        const inrow = this.getRow();
        inrow.style.cssText = 'height: 200px;background-color:#20328a;margin-top: 30px';
        col1.appendChild(inrow);

        break;
      }
      case 1: {
        col2 = this.getCol(4);
        const inrow = this.getRow();
        inrow.style.cssText = 'height: 200px;background-color:#20328a;margin-top: 30px';
        col2.appendChild(inrow);

        break;

      }
      case 2: {
        col3 = this.getCol(3);
        const inrow = this.getRow();
        inrow.style.cssText = 'height: 200px;background-color:#20328a;margin-top: 30px';
        col3.appendChild(inrow);

        break;

      }
      case 3: {
        const inrow = this.getRow();
        inrow.style.cssText = 'height: 200px;background-color:#20328a;margin-top: 30px';
        col1.appendChild(inrow);

        break;

      }
      case 4: {
        const inrow = this.getRow();
        inrow.style.cssText = 'height: 200px;background-color:#20328a;margin-top: 30px';
        col3.appendChild(inrow);

        break;

      }
    }
    if (col1) {
      this.dragDropSectionItem.nativeElement.appendChild(col1);
    }
    if (col2) {
      this.dragDropSectionItem.nativeElement.appendChild(col2);
    }
    if (col3) {
      this.dragDropSectionItem.nativeElement.appendChild(col3);
    }
    // this.dragDropSectionItem.nativeElement.appendChild(this.row);

  }
  getRow = () => {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
  }

  getCol = (col: number) => {
    const column = document.createElement('div');
    column.classList.add('col');
    column.classList.add('s' + col);
    column.classList.add('m' + col);
    column.classList.add('l' + col);
    return column;
  }
}


