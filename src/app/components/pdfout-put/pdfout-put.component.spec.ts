import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFOutPutComponent } from './pdfout-put.component';

describe('PDFOutPutComponent', () => {
  let component: PDFOutPutComponent;
  let fixture: ComponentFixture<PDFOutPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDFOutPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFOutPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
