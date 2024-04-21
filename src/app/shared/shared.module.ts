import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { PageContentComponent } from './components/layout/page-content/page-content.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RouterLink } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [HeaderComponent, PageContentComponent, FooterComponent],
  imports: [CommonModule, RouterLink, MatSnackBarModule],
  exports: [CommonModule, FooterComponent, HeaderComponent, PageContentComponent],
})
export class SharedModule {}
