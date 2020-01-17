import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  public form: FormGroup;
  @Output() onnew: EventEmitter<any> = new EventEmitter();
  constructor() { }

  private defineForm(): void {
    this.form = new FormGroup({
      title: new FormControl({ value: null, disabled: false }, [Validators.required]),
      body: new FormControl({ value: null, disabled: false }, [Validators.required]),
      source: new FormControl({ value: null, disabled: false }),
      publisher: new FormControl({ value: null, disabled: false }),
      image: new FormControl({ value: null, disabled: false })
    });
  }

  ngOnInit() {
    this.defineForm();
  }

  public onSubmit(): void {
    this.onnew.emit({
      config: this.form.value,
      action: 'new'
    });
  }

  public clickCancel(): void {
    this.onnew.emit({
      action: 'cancel'
    });
  }
}
