import { UserComponent } from './components/users/users.component';
import { CadastroProjetosComponent } from './components/cadastro-projetos/cadastro-projetos.component';
import { IntroComponent } from './components/intro/intro.component';
import { Routes, RouterModule } from "@angular/router";

const AppRoutes: Routes = [
    {path: '', component: IntroComponent },
    {path: 'cadastro-projetos', component: CadastroProjetosComponent },
    {path: 'user', component: UserComponent}
]

export const routing = RouterModule.forRoot(AppRoutes);