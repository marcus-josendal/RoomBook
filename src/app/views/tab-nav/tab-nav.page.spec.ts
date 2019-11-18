import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabNavPage } from './tab-nav.page';

describe('TabNavPage', () => {
  let component: TabNavPage;
  let fixture: ComponentFixture<TabNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
