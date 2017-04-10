import { CadastroProjetosComponent } from './cadastro-projetos/cadastro-projetos.component';
import { IntroComponent } from './intro/intro.component';
import { Routes, RouterModule } from "@angular/router";

const AppRoutes: Routes = [
    {path: '', component: IntroComponent },
    {path: 'cadastro-projetos', component: CadastroProjetosComponent }
]

export const routing = RouterModule.forRoot(AppRoutes);