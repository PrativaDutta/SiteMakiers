import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFailureComponent } from './transaction-failure.component';

describe('TransactionFailureComponent', () => {
  let component: TransactionFailureComponent;
  let fixture: ComponentFixture<TransactionFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
