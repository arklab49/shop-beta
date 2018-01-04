import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/app-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getProducts()
      .map(actions => {
        return actions.map(action => ({ key: action.key, value: action.payload.val() }));
      })
      .subscribe(products => {
        this.products = products;
      });
  }

  ngOnInit() {
  }

}
