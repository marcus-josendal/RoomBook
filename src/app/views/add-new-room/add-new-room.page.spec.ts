import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewRoomPage } from './add-new-room.page';

describe('AddNewRoomPage', () => {
  let component: AddNewRoomPage;
  let fixture: ComponentFixture<AddNewRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
