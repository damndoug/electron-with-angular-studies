import { AddProjectFormModel } from './../../../../_models/add-project-form.model';
import { ProjectService } from './../../../_services/project.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FirebaseListObservable, AngularFire } from "angularfire2";

@Component({
  selector: 'cadastro-projetos',
  templateUrl: './cadastro-projetos.component.html',
  styleUrls: ['./cadastro-projetos.component.css']
})
export class CadastroProjetosComponent implements OnInit {

  projectService;
  formModel;

  color = 'primary';
  mode = 'determinate';
  value = 0
  
  progressBarInitialValue = 0;
  progressDefaultMessage: string = 'Não há tarefas para esse projeto ainda.'
  progressBarLabelValue: string = this.progressDefaultMessage;
  projects: FirebaseListObservable<any>;
  thereIsTask: boolean = false;
  tasks = [];
  keys = [];

  constructor(private af: AngularFire, private ps: ProjectService) {
    this.keys = ps.getProjectKeys();
    this.formModel = new AddProjectFormModel();
  } 

  ngOnInit() {

    this.projects = this.af.database.list('/projectList')
  }

  addProject(form) {

    this.formModel.name = form.value.name;
    this.formModel.branch = form.value.branch;
    this.formModel.obs = form.value.obs;
    this.formModel.saving = form.value.saving;
    this.formModel.sla = form.value.sla;
    this.formModel.team = form.value.team;
    this.formModel.tasks = this.tasks;
    
    this.projects.push(this.formModel).then(res => console.log(res.key))
    this.clearForm(form);
  }

  removeProject(project) {

    this.af.database.object('/projectList/' + project.$key).remove().then(res => console.log('SUCCESS', res)).catch(error => console.log('ERROR', error));
  }

  addTaskInput() {

    this.thereIsTask = true;
  }
    
  addTask(form){

    this.tasks.push(form.value.task);
    this.progressBarLabelValue = 'Projeto está ' + this.value + "% concluído"
  }  

  removeTask(task, event) {
    
    let index = this.tasks.indexOf(task);
    
    try {

      if (event.toElement.previousElementSibling.childNodes[1].checked)
        this.progressBarInitialValue--
    } catch (error) {
      
      if (this.progressBarInitialValue > 0)
        this.progressBarInitialValue--;    
    }
    
    if (index > -1) {
      this.tasks.splice(index, 1);
    }


    this.calculateProgressBar(this.tasks.length)
  }

  toggleCheckboxes(event) {

    if (event.target.checked) {
      this.progressBarInitialValue++;
    } else { 
      this.progressBarInitialValue--;
    }

    this.calculateProgressBar(this.tasks.length)
  }

  calculateProgressBar(tasks) {
    
    let progressBarFinalValue: number;

    progressBarFinalValue =  this.progressBarInitialValue / tasks * 100

    if (isNaN(progressBarFinalValue))
      progressBarFinalValue = 0
    
    this.value = progressBarFinalValue;

      
    
    this.progressBarLabelValue = 'Projeto está ' + Math.round(progressBarFinalValue) + "% concluído"
    
    if (tasks === 0)
      this.progressBarLabelValue = this.progressDefaultMessage;

    if (this.value === 100)
      this.formModel.isProjectCompleted = true;
    else 
      this.formModel.isProjectCompleted = false;
  }

  editProject(project) {
    
    console.log(project)
  }

  clearForm(form){
    console.log(form);
    this.tasks = [];
    this.thereIsTask = false;
    form.reset();
  }
}
