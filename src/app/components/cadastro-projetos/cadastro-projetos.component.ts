import { ProjectService } from './../../_services/project.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
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
  tasks = [];
  keys = [];
  htmlToAdd: string = '';
  @ViewChild('progressBar') el:ElementRef;

  constructor(private af: AngularFire, private ps: ProjectService, private renderer: Renderer) {
    this.keys = ps.getProjectKeys();
  } 

  ngOnInit() {

    this.projects = this.af.database.list('/projectList')
  }

  addProject(form) {

    console.log(form.value)
    // this.projects.push(form.value).then(res => console.log(res.key))
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

    this.tasks.push(form.value.task);

    // $('#progressBar')
    //   .progress('set progress',this.tasks.length)
    
  }  

  removeTask(task) {
    
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  toggleCheckboxes(event) {

    console.log(event.target.nextElementSibling.innerText)
  }
}
