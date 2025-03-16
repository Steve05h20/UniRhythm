import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ListeFormComponent } from '../../forms/liste-form/liste-form.component';
import { ChansonFormComponent } from '../../forms/chanson-form/chanson-form.component';
import { ListeChansonFormComponent } from '../../forms/liste-chanson-form/liste-chanson-form.component';
import { EditFormComponent } from '../../forms/edit-form/edit-form.component';
import { DeleteConfirmationComponent } from '../../forms/delete-confirmation/delete-confirmation.component';
import { ListeSommaireComponent } from '../liste-sommaire/liste-sommaire.component';
import { RouterLink, RouterModule } from '@angular/router';
import { NgClass } from "@angular/common";
import { FormatNumberPipe } from "../../pipes/format-number/format-number.pipe";
import { GetListeService } from '../../service/liste/get-liste.service';
import { IChanson, IListe } from '../../interface/interface-Liste-Chanson';
import { RefreshService } from '../../service/refresh/refresh.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LectureCountComponent } from '../lecture-count/lecture-count.component';
import { ActionButtonComponent } from '../shared/action-button/action-button.component';
import { ButtonGroupComponent } from '../shared/button-group/button-group.component';

@Component({
  selector: 'app-tableau-chansons',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    ActionButtonComponent,
    ButtonGroupComponent,
    ListeSommaireComponent,
    LectureCountComponent
  ],
  templateUrl: './tableau-chansons.component.html',
  styleUrl: './tableau-chansons.component.css'
})
export class TableauChansonsComponent implements OnChanges, OnInit, OnDestroy {
  displayedColumns: string[] = ['titre', 'nomArtiste', 'nomAlbum', 'nbLecture', 'action'];
  @Input() _id = "";
  private destroy$ = new Subject<void>();

  dataSource: IChanson[] = [];
  SpotifyData: IListe[] = [];

  constructor(
    private service_liste: GetListeService,
    private dialog: MatDialog,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    // S'abonner aux événements de rafraîchissement
    this.refreshService.refreshListe$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shouldRefresh => {
        if (shouldRefresh) {
          this.getListes();
          if (this._id) {
            this.getListeWithChansonsWithListeId();
          }
          this.refreshService.resetListeRefresh();
        }
      });

    this.refreshService.refreshChanson$
      .pipe(takeUntil(this.destroy$))
      .subscribe(shouldRefresh => {
        if (shouldRefresh && this._id) {
          this.getListeWithChansonsWithListeId();
          this.refreshService.resetChansonRefresh();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getListes();
    if (this._id && changes['_id']) {
      this.getListeWithChansonsWithListeId();
    }
  }

  getListeWithChansonsWithListeId(): void {
    this.dataSource = [];
    if (!this._id) return;

    this.service_liste.getListeWithChansonsWithListeId(this._id).subscribe((liste => {
      this.dataSource = liste.chansons || [];
    }));
  }

  getListes() {
    this.service_liste.getListe().subscribe((liste: IListe[]) => {
      this.SpotifyData = liste;
    });
  }

  openListeForm(): void {
    const dialogRef = this.dialog.open(ListeFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.refreshService.triggerListeRefresh();
      }
    });
  }

  openChansonForm(): void {
    const dialogRef = this.dialog.open(ChansonFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.refreshService.triggerChansonRefresh();
      }
    });
  }

  openListeChansonForm(): void {
    const dialogRef = this.dialog.open(ListeChansonFormComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.refreshService.triggerBothRefresh();
      }
    });
  }

  openEditForm(item: IChanson | IListe | null, type: 'liste' | 'chanson'): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '600px',
      data: { type, item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        if (type === 'chanson') {
          this.refreshService.triggerChansonRefresh();
        } else {
          this.refreshService.triggerListeRefresh();
        }
      }
    });
  }

  openDeleteDialog(item: IChanson | IListe | null, type: 'liste' | 'chanson'): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { type, item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        if (type === 'chanson') {
          this.refreshService.triggerChansonRefresh();
        } else {
          this.refreshService.triggerListeRefresh();
        }
      }
    });
  }
}
