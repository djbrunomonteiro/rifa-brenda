import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdialogRemoveComponent } from './edialog-remove.component';

describe('EdialogRemoveComponent', () => {
  let component: EdialogRemoveComponent;
  let fixture: ComponentFixture<EdialogRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdialogRemoveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdialogRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
