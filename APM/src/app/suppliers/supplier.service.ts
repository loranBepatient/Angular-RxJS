import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import {
  concatMap,
  mergeMap,
  shareReplay,
  switchMap,
  tap
} from "rxjs/operators";
import { Supplier } from "./supplier";

@Injectable({
  providedIn: "root"
})
export class SupplierService {
  suppliersUrl = "api/suppliers";

  suppliersWithConcatMap$ = of(1, 5, 8).pipe(
    concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );
  suppliersWithMergeMap$ = of(1, 5, 8).pipe(
    mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  suppliersWithSwitchMap$ = of(1, 5, 8).pipe(
    switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  );

  suppliers$ = this.http
    .get<Supplier[]>(this.suppliersUrl)
    .pipe(
      tap(
        suppliers =>
          console.log("retrieved suppliers:: ", console.table(suppliers)),
        shareReplay(1)
      )
    );

  constructor(private http: HttpClient) {
    // this.suppliersWithConcatMap$.subscribe(supplier =>
    //   console.log("suppliersWithConcatMap: ", supplier)
    // );
    // this.suppliersWithMergeMap$.subscribe(supplier =>
    //   console.log("suppliersWithMergeMap$: ", supplier)
    // );
    // this.suppliersWithSwitchMap$.subscribe(supplier => {
    //   console.log("suppliersWithSwitchMap$: ", supplier);
    // });
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
