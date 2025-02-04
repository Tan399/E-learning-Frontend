import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container">
      <mat-spinner></mat-spinner>
      <p>Loading...</p>
    </div>
  `,
  styles: [
    `
      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
      }
      p {
        margin-top: 10px;
        font-size: 16px;
        color: #555;
      }
    `,
  ],
})
export class LoadingComponent {}
