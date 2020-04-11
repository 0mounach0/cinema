import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsClientComponent } from './sessions-client.component';

describe('SessionsClientComponent', () => {
  let component: SessionsClientComponent;
  let fixture: ComponentFixture<SessionsClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
