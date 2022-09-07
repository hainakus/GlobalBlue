import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {SharedModule} from "../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [SharedModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should not have an error message`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const error = compiled.querySelector('mat-error')
    expect(error?.textContent).toBeFalsy();
  });

  it(`should have 10% selected VAT`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('mat-radio-button')
    expect(input?.getAttribute('value')).toEqual('10');
  });
});
