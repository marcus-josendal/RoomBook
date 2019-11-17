import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllRoomsPage } from './all-rooms.page';

describe('AllRoomsPage', () => {
  let component: AllRoomsPage;
  let fixture: ComponentFixture<AllRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRoomsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
