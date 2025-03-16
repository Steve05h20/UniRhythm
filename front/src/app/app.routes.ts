import { Routes } from '@angular/router';
import { ListeCompletComponent } from "../components/liste-complet/liste-complet.component";
import { ChansonComponent } from '../components/chanson/chanson.component';
import { TableauChansonsComponent } from "../components/tableau-chansons/tableau-chansons.component";
import { AProposComponent } from '../components/a-propos/a-propos.component';
import { ThemesMusicauxComponent } from '../components/themes-musicaux/themes-musicaux.component';
import { ChansonThemeComponent } from '../components/chanson-theme/chanson-theme.component';

export const routes: Routes = [
  { path: '', redirectTo: '/liste/67720b7b7d93faf250876327', pathMatch: 'full' },
  { path: 'liste/:_id', component: ListeCompletComponent },
  { path: 'liste/:_id/:chanson', component: ChansonComponent },
  { path: 'tableau/:_id', component: TableauChansonsComponent },
  { path: 'tableau', component: TableauChansonsComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'themes-musicaux', component: ThemesMusicauxComponent },
  { path: 'themes-musicaux/:id', component: ChansonThemeComponent }
];
