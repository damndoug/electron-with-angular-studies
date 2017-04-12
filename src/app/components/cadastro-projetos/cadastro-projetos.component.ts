import { ProjectService } from './../../_services/project.service';
import { Component, OnInit, Input } from '@angular/core';
import { FirebaseListObservable } from "angularfire2";

@Component({
  selector: 'cadastro-projetos',
  templateUrl: './cadastro-projetos.component.html',
  styleUrls: ['./cadastro-projetos.component.css']
})
export class CadastroProjetosComponent implements OnInit {

  projectService: ProjectService;
  projects: FirebaseListObservable<any>;

  constructor(ps: ProjectService) {

    this.projectService = ps;
  }

  ngOnInit() {

    this.listProjects();  
  }

  saveProject(form) {

    console.log(form)

  }

  listProjects() {

    this.projectService.getProjectData().subscribe(res => {
      console.log(res);
      this.projects = res[0]
      return this.projects
    });
  }

}
