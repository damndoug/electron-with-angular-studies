import { ProjectService } from './../../_services/project.service';
import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'cadastro-projetos',
  templateUrl: './cadastro-projetos.component.html',
  styleUrls: ['./cadastro-projetos.component.css']
})
export class CadastroProjetosComponent implements OnInit {

  projectService: ProjectService;
  projects: FirebaseListObservable<any>;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {

    this.projects = this.af.database.list('/projectList')
  }

  addProject(form) {

    this.projects.push(form.value).then(res => console.log(res.key))
  }
}
