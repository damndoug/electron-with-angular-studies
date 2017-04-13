import { ProjectService } from './../../_services/project.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'cadastro-projetos',
  templateUrl: './cadastro-projetos.component.html',
  styleUrls: ['./cadastro-projetos.component.css']
})
export class CadastroProjetosComponent implements OnInit {

  projectService;
  projects: FirebaseListObservable<any>;
  thereIsTask: boolean = false;
  task;
  tasks;
  keys = [];
  htmlToAdd: string = '';

  constructor(private af: AngularFire, private ps: ProjectService) {
    this.keys = ps.getProjectKeys();
  } 

  ngOnInit() {

    this.projects = this.af.database.list('/projectList')
  }

  addProject(form) {

    this.projects.push(form.value).then(res => console.log(res.key))
  }

  removeProject(project) {

    this.af.database.object('/projectList/' + project.$key).remove().then(res => console.log('SUCCESS', res)).catch(error => console.log('ERROR', error));
  }

  addTaskInput() {

    this.htmlToAdd = this.htmlToAdd + `
    <div> 
      <div class="ui checkbox">
        <input type="checkbox">
        <label ngDefaultControl></label>
      </div>
    </div>
    `

    this.thereIsTask = true;
  }
    
  addTask(form){

    console.log(form)
    // this.af.database.object('/projectList/')
    // this.tasks.push(form.value).then(res => console.log(res.key))
  }  
}
