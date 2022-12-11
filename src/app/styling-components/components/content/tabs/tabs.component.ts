import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabsPaneComponent } from './tabs-pane.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabsPaneComponent)
  tabs: QueryList<TabsPaneComponent> | null = null;

  ngAfterContentInit(): void {
    if (!this.tabs) {
      return;
    }
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabsPaneComponent): void {
    this.tabs?.forEach(tab => (tab.active = false));
    tab.active = true;
  }
}
