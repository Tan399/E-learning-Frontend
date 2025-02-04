import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit() {
   this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
       
        this.loaderService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationError) {
        
        this.loaderService.hide();
      }
    });
  }


}
