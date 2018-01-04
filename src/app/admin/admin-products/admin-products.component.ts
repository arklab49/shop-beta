import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../../models/app-product';
import 'rxjs/add/operator/map'
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[];
  subscription: Subscription;
  items: Product[] = [];
  itemCount: number;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};

  constructor(private productService: ProductService) {

  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20]
    };
    this.subscription = this.productService.getProducts()
      .map(actions => {
        return actions.map(action => ({ key: action.key, value: action.payload.val() }));
      })
      .subscribe(products => {
        this.products = products;
        this.dtTrigger.next();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
