import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SystemComponent],
  imports: [SystemRoutingModule, SharedModule],
})
export class SystemModule {}
