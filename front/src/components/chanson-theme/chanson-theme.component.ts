import { Component, OnInit } from '@angular/core';
import { IChanson } from '../../interface/interface-Liste-Chanson';
import { NgClass, DatePipe } from "@angular/common";
import { ConvertSecondsToMinSecPipe } from '../../pipes/convert-seconds-to-min-sec/convert-seconds-to-min-sec.pipe';
import { FormatNumberPipe } from '../../pipes/format-number/format-number.pipe';
import { ParolesComponent } from '../paroles/paroles.component';
import { GetChansonService } from '../../service/chanson/get-chanson.service';
import { RouterLink, ActivatedRoute } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { LectureCountComponent } from '../lecture-count/lecture-count.component';

@Component({
  selector: 'app-chanson-theme',
  standalone: true,
  imports: [
    ConvertSecondsToMinSecPipe,
    ParolesComponent,
    DatePipe,
    RouterLink,
    MatIconModule,
    LectureCountComponent
],
  templateUrl: './chanson-theme.component.html'
})
export class ChansonThemeComponent implements OnInit {
  chansonId: string = '';
  dataChanson: IChanson = {
    _id: "",
    titre: '',
    nomArtiste: '',
    nomAlbum: '',
    dateDePublication: '',
    dureeSecondes: 0,
    nbLecture: 0,
    paroles: ''
  };

  constructor(
    private chansonService: GetChansonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.chansonId = params['id'];
        this.loadChanson();
      }
    });
  }

  private loadChanson() {
    this.chansonService.getChansonById(this.chansonId).subscribe({
      next: (chanson) => {
        this.dataChanson = chanson;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la chanson:', error);
      }
    });
  }
}
