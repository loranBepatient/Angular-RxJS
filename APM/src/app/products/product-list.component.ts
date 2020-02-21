import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, combineLatest, EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ProductCategoryService } from "../product-categories/product-category.service";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = "Product List";
  errorMessage = "";
  categories;
  selectedCategoryId = 1;

  private selectedCategoryIdSubject = new BehaviorSubject<number>(0);
  selectedCategoryIdAction$ = this.selectedCategoryIdSubject.asObservable();

  categories$ = this.categoriesService.categories$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.selectedCategoryIdAction$
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter(p =>
        selectedCategoryId ? p.categoryId === selectedCategoryId : true
      )
    ),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(
    private productService: ProductService,
    private categoriesService: ProductCategoryService
  ) {}

  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.selectedCategoryIdSubject.next(+categoryId);
  }
}
