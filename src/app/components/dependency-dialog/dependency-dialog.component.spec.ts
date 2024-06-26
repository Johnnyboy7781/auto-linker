import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyDialogComponent } from './dependency-dialog.component';

describe('DependencyDialogComponent', () => {
  let component: DependencyDialogComponent;
  let fixture: ComponentFixture<DependencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependencyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DependencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
