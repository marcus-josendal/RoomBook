import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBookedRoomsPage } from './my-booked-rooms.page';

describe('MyBookedRoomsPage', () => {
  let component: MyBookedRoomsPage;
  let fixture: ComponentFixture<MyBookedRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBookedRoomsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBookedRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
