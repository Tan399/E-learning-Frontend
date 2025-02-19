import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}
