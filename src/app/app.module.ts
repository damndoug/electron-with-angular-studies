import { routing } from './app.router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MenuLateralComponent } from './components/menu-lateral/menu-lateral.component';
import { IntroComponent } from './components/intro/intro.component';
import { CadastroProjetosComponent } from './components/cadastro-projetos/cadastro-projetos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    IntroComponent,
    CadastroProjetosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
