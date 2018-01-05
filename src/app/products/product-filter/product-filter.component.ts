import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories;
  @Input('category') category;

  constructor(private categoryService: CategoryService) { 
    this.categoryService.getCategories()
    .map(actions => {
      return actions.map(action => ({ key: action.key, value: action.payload.val() }));
    })
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  ngOnInit() {
  }

}
