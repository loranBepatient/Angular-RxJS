import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { EMPTY, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Component({
  selector: "pm-product-list",
  templateUrl: "./product-list-alt.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = "Products";
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  public products$ = this.productService.productsWithCategories$.pipe(
    catchError(error => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    })
  );

  public selectedProduct$ = this.productService.selectedProduct$;

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.productService.setSelected(productId);
    console.log("Not yet implemented");
  }
}
