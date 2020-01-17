import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Feed } from 'src/app/model/feed';

@Component({
  selector: 'app-feed',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  @Input() config: Feed;

  @Output() onupdate: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  public loading: boolean;
  public editMode: boolean;
  constructor(private router: Router) { }

  private defineForm(): void {
    this.form = new FormGroup({
      title: new FormControl({ value: this.config.title, disabled: false }, [Validators.required]),
      body: new FormControl({ value: this.config.body, disabled: false }, [Validators.required]),
      source: new FormControl({ value: this.config.source, disabled: false }),
      publisher: new FormControl({ value: this.config.publisher, disabled: false }),
      image: new FormControl({ value: this.config.image, disabled: false })
    });
  }

  ngOnInit() {
    this.defineForm();
  }

  public clickEdit(): void {
    this.editMode = true;
  }

  public clickDelete(): void {
    this.onupdate.emit({
      config: this.config,
      action: 'delete'
    });
  }

  public clickCancel(): void {
    this.editMode = false;
  }

  public onSubmit(): void {
    this.loading = true;
    this.editMode = false;
    this.config.title = this.form.value.title;
    this.config.body = this.form.value.body;
    this.config.source = this.form.value.source;
    this.config.publisher = this.form.value.publisher;
    this.config.image = this.form.value.image;
    setTimeout(() => {
      this.loading = false;
    }, 800);

  }


}
