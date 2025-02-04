import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;
    this.loadingService.show();

    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest).pipe(
        finalize(() => this.handleRequestEnd())
      );
    }

    return next.handle(req).pipe(
      finalize(() => this.handleRequestEnd())
    );
  }

  private handleRequestEnd() {
    this.activeRequests--;
    if (this.activeRequests === 0) {
      
      setTimeout(()=>{
        this.loadingService.hide();
      },500)
      // this.loadingService.hide();
    }
  }
}