import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart;
  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  logout() {
    this.auth.logout();
  }
}