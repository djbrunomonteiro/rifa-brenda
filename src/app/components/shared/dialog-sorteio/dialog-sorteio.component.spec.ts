import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSorteioComponent } from './dialog-sorteio.component';

describe('DialogSorteioComponent', () => {
  let component: DialogSorteioComponent;
  let fixture: ComponentFixture<DialogSorteioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSorteioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSorteioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
