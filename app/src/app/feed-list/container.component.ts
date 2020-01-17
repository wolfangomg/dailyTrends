import { Component, OnInit } from '@angular/core';
import { Feed } from '../model/feed';
import { config, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from '../service/api.service';
// const tmp = [
//   {
//     id: 1,
//     title: 'Feed1',
//     body: 'lorem ipsum blablalba',
//     source: 'webpage',
//     publisher: 'myself'
//   },
//   {
//     id: 2,
//     title: 'Feed2',
//     body: 'lorem ipsum blablalba',
//     source: 'webpage',
//     publisher: 'myself'
//   },
//   {
//     id: 3,
//     title: 'Feed3',
//     body: 'lorem ipsum blablalba',
//     source: 'webpage',
//     publisher: 'myself'
//   }
// ];

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  public list: Array<any>;
  public newMode: boolean;
  private destroy$: Subject<boolean> = new Subject();
  constructor(private api: ApiService) { }

  private getData(): void {
    this.api.getFeedList().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.list = data);
  }
  ngOnInit() {
    // if (!this.list) {
    //   this.list = tmp;
    // }
    this.getData();
  }

  public clickNew(): void {
    this.newMode = !this.newMode;
  }

  public onUpdateFeed(evt: {action: string, config: Feed}): void {
    if (evt.action === 'delete') {
      this.list = this.list.filter(f => f.id !== evt.config.id);
    }

    if (evt.action === 'new') {
      this.newMode = false;
      evt.config.id = this.list.length.toString();
      this.list.push(evt.config);
    }

    if (evt.action === 'cancel') {
      this.newMode = false;
    }

    console.log(evt.config);
  }

}
