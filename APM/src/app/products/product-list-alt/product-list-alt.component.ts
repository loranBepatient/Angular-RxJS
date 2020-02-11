import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { EMPTY } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list-alt.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = "Products";
  errorMessage = "";
  selectedProductId;

  public products$ = this.productService.products$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    console.log("Not yet implemented");
  }
}
