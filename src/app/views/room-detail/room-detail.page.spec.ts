import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RoomDetailPage } from './room-detail.page';

describe('RoomDetailPage', () => {
  let component: RoomDetailPage;
  let fixture: ComponentFixture<RoomDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RoomDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
