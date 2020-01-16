import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed',
  templateUrl: './detailed.component.html',
  styleUrls: ['./detailed.component.scss']
})
export class DetailedComponent implements OnInit {
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
    this.router.navigateByUrl('/home');
  }


}
