import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostoputComponent } from './postoput.component';

describe('PostoputComponent', () => {
  let component: PostoputComponent;
  let fixture: ComponentFixture<PostoputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostoputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostoputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
