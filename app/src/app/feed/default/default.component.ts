import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() body: string;
  @Input() source: string;
  @Input() publisher: string;
  @Input() image: string;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  public clickDetails(): void {
    this.router.navigateByUrl('/' + this.id);
  }

}
