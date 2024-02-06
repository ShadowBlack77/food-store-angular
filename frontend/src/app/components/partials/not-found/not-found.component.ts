import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  @Input() visible = false;
  @Input() notFoundMessage = "Nothing Found!";
  @Input() resetLinkText = "Reset";
  @Input() resetLinkRoute = "/";
}
