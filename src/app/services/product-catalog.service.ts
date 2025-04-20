import { Injectable } from "@angular/core";
import { Section } from "../../models/interfaces.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProductCatalogService {
  constructor(private http: HttpClient) {}

  getParsedProducts(): Observable<Section[]> {
    return this.http.get<Section[]>(`${environment.apiUrl}/api/products/parsed`);
  }

  updateCatalog(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/products/parsed`, {});
  }

  getProfitMargin() {
    return this.http.get<{ margin: number }>(`${environment.apiUrl}/api/config/profit`);
  }

  setProfitMargin(newMargin: number) {
    return this.http.put(`${environment.apiUrl}/api/config/profit`, { margin: newMargin });
  }
}
