import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/app-product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[];
  category;
  cart: any = null;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });

    this.productService.getProducts()
      .map(actions => {
        return actions.map(action => ({ key: action.key, value: action.payload.val() }));
      })
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      }).
      subscribe(
      params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.value.category === this.category) :
          this.products;
      }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
