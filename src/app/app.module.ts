import { ProjectService } from './_services/project.service';
import { UserComponent } from './components/users/users.component';
import { routing } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdProgressBar } from "@angular/material";

import { AppComponent } from './app.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { IntroComponent } from './components/intro/intro.component';
import { CadastroProjetosComponent } from './components/cadastro-projetos/cadastro-projetos.component';
import { AngularFireModule } from "angularfire2";
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ProjectsMenuComponent } from './components/projects-menu/projects-menu.component';

export const firebaseConfig = {
  apiKey: "AIzaSyAKrfDFqBI0YTrtnVu6rHcABkNapypMCtA",
  authDomain: "dashboard-90f5a.firebaseapp.com",
  databaseURL: "https://dashboard-90f5a.firebaseio.com",
  projectId: "dashboard-90f5a",
  storageBucket: "dashboard-90f5a.appspot.com",
  messagingSenderId: "770003233859"
};

    @NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    IntroComponent,
    CadastroProjetosComponent,
    UserComponent,
    MdProgressBar,
    EditProjectComponent,
    ProjectsMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
