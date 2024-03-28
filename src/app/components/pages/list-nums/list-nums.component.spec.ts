import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNumsComponent } from './list-nums.component';

describe('ListNumsComponent', () => {
  let component: ListNumsComponent;
  let fixture: ComponentFixture<ListNumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNumsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListNumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
