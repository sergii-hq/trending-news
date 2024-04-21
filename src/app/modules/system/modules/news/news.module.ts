import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [NewsComponent, NewsPageComponent],
  imports: [NewsRoutingModule, SharedModule],
})
export class NewsModule {}
