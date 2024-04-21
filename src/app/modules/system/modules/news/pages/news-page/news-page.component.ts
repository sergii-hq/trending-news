import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { forkJoin, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { INewsItem } from '../../interfaces/news.interface';
import { LoadingService } from '../../../../../../shared/services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsPageComponent implements OnInit, OnDestroy {
  newsIds: number[] = [];

  news: INewsItem[] = [];

  itemsPerPage = 10;

  currentPage = 1;

  totalItems = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private loadingService: LoadingService,
    private newsService: NewsService,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadingService.show();
    this.newsService
      .getNews()
      .pipe(
        tap((res) => {
          this.newsIds = res;
          this.totalItems = res.length;
        }),
        switchMap((res) => {
          const observables: Observable<INewsItem>[] = [];

          res
            .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
            .forEach((newsId) => {
              observables.push(this.newsService.getNewsItem(newsId));
            });

          return forkJoin(observables);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.loadingService.hide();
          this.news = res;
          this.cd.markForCheck();
        },
        () => this.errorHandler()
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPageChange(currentPage: number) {
    this.currentPage = currentPage;
    const observables: Observable<INewsItem>[] = [];

    this.newsIds
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage)
      .forEach((newsId) => {
        observables.push(this.newsService.getNewsItem(newsId));
      });

    this.loadingService.show();
    forkJoin(observables)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.loadingService.hide();
          this.news = res;
          this.cd.markForCheck();
        },
        () => this.errorHandler()
      );
  }

  errorHandler() {
    this.loadingService.hide();
    this.snackBar.open('An error occurred while processing your request. Please, try again.', undefined, {
      duration: 5000,
      horizontalPosition: 'right',
    });
  }
}
