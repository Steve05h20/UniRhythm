import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MOKSLIST } from '../../../Moks/spotiObjets';
import { IChanson, } from '../../interface/interface-Liste-Chanson';
import {NgClass, NgOptimizedImage, DatePipe} from "@angular/common";
import { ConvertSecondsToMinSecPipe } from '../../pipes/convert-seconds-to-min-sec/convert-seconds-to-min-sec.pipe';
import { FormatNumberPipe } from '../../pipes/format-number/format-number.pipe';
import { ParolesComponent } from '../paroles/paroles.component';
import { GetListeService } from '../../service/liste/get-liste.service';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { LectureCountComponent } from '../lecture-count/lecture-count.component';

@Component({
  selector: 'app-chanson',
  standalone: true,
  imports: [
    ConvertSecondsToMinSecPipe, ParolesComponent, DatePipe, RouterLink, MatIconModule, LectureCountComponent
],
  templateUrl: './chanson.component.html',
  styleUrl: './chanson.component.css'
})
export class ChansonComponent implements OnChanges {
  @Input() _id = "";
  @Input() chanson = "";

  SpotifyDataImage: string = '';
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_id'] || changes['chanson']) {
      this.getListeWithChansonsWithListeId()
    }
  }


  constructor(private service_liste: GetListeService){}

  getListeWithChansonsWithListeId():void{
    this.service_liste.getListeWithChansonsWithListeId(this._id).subscribe((liste=>{
        this.SpotifyDataImage = liste.image ?? '';
        const chanson = liste.chansons.find(chanson => chanson._id === this.chanson);
        if (chanson) {
            this.dataChanson = chanson;
        }
    }))
  }
}

