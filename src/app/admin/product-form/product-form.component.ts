import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { Product } from '../../../models/app-product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  id;
  product: Product = {
    key: '',
    value: {
      title: '',
      price: null,
      imageUrl: '',
      category: ''
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();

  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product)
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getItem(this.id)
        .subscribe(product => {
          this.product.value = product.payload.val();
        });
    }
  }

}
