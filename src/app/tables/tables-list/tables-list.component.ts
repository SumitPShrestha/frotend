import { Component, OnInit } from '@angular/core';
import {TablesService} from '../tables.service';
import { faEdit, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.css']
})
export class TablesListComponent implements OnInit {
  allTables;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  constructor(private tableService: TablesService) {
    this.tableService.getAllTables().subscribe(tables => {
      this.allTables = tables;
    });
  }

  ngOnInit() {
  }

}
