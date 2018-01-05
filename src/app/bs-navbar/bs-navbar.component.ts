import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.cartService.getCart();
    cart$.snapshotChanges().subscribe(res => {
      let cart = res.payload.val();
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}