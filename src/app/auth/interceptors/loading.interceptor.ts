import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/loader/loader.service';



@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.show(); 

    return next.handle(req).pipe(
      finalize(() => {

        setTimeout(()=>{
          this.loadingService.hide(); 
        },300)

        
       
      })
    );
  }

  
}
