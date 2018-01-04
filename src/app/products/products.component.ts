import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/app-product';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[];
  categories;
  category;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productService.getProducts()
      .map(actions => {
        return actions.map(action => ({ key: action.key, value: action.payload.val() }));
      })
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }).
        subscribe(
          params => {
            this.category = params.get('category');
            this.filteredProducts = (this.category) ? 
            this.products.filter(p => p.value.category === this.category) : 
            this.products;
          }
        );

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
