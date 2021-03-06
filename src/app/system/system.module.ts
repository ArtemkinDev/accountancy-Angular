import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SystemSideBarComponent } from './system-side-bar/system-side-bar.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from '../shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from '../services/bill.service';
import { MomentPipe } from '../shared/pipes/moment.pipe';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriesService } from '../services/categories.service';
import { EventsService } from '../services/events.service';
import { HistoryChatComponent } from './history-page/history-chat/history-chat.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterPipe } from '../shared/pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    NgxChartsModule
  ],
  declarations: [SystemComponent, BillPageComponent, HistoryPageComponent, PlanningPageComponent, RecordsPageComponent, SystemSideBarComponent, HeaderComponent, DropdownDirective, BillCardComponent, CurrencyCardComponent, MomentPipe, AddEventComponent, AddCategoryComponent, EditCategoryComponent, HistoryChatComponent, HistoryDetailComponent, HistoryEventsComponent, HistoryFilterComponent,FilterPipe],
  exports: [ SystemRoutingModule ],
  providers: [BillService, CategoriesService, EventsService]
})

export class SystemModule {
}
