import { Component } from '@angular/core';
import { NavbarSecondaryComponent } from '../components/navigation/navbar-secondary/navbar-secondary.component';
import {
  TooltipComponent,
  TooltipMessageDirective
} from '../components/popups/tooltip/tooltip.component';
import { PillsComponent } from '../components/navigation/pills/pills.component';
import { AccordionPaneComponent } from '../components/content/accordion/accordion-pane.component';
import { AccordionComponent } from '../components/content/accordion/accordion.component';
import { PromoComponent } from '../promo/promo.component';
import {
  MessageComponent,
  MessageTitleDirective,
  MessageContentDirective
} from '../components/content/message/message.component';
import { TabsPaneComponent } from '../components/content/tabs/tabs-pane.component';
import { TabsComponent } from '../components/content/tabs/tabs.component';
import {
  ModalComponent,
  ModalContentDirective,
  ModalHighlightDirective
} from '../components/popups/modal/modal.component';
import { NavbarPrimaryComponent } from '../components/navigation/navbar-primary/navbar-primary.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    NavbarPrimaryComponent,
    ModalComponent,
    ModalContentDirective,
    TabsComponent,
    TabsPaneComponent,
    MessageComponent,
    MessageTitleDirective,
    MessageContentDirective,
    ModalHighlightDirective,
    PromoComponent,
    AccordionComponent,
    AccordionPaneComponent,
    PillsComponent,
    TooltipComponent,
    TooltipMessageDirective,
    NavbarSecondaryComponent
  ]
})
export class HomeComponent {
  title = 'Estilos en aplicaciones Angular';
  subTitle = 'Para aplicaciones modernas';
  pills = [{ label: 'HTML' }, { label: 'CSS' }, { label: 'SASS' }];
}
