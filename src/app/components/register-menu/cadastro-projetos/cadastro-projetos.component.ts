import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  projectForm: FormGroup;

  constructor(private af: AngularFire, private ps: ProjectService, fb: FormBuilder) {

    this.keys = ps.getProjectKeys();
    this.formModel = new AddProjectFormModel();
    this.projectForm = fb.group({
      'name': [null, Validators.required],
      'team': [null, Validators.required],
      'saving': [null],
      'sla': [null],
      'branch': [null, Validators.required],
      'obs': [null],
      'task': [null]
    });
  } 

  ngOnInit() {

    this.projects = this.af.database.list('/projectList')
  }

  addProject() {

    // this.formModel.name = this.projectForm.value.name;
    // this.formModel.branch = this.projectForm.value.branch;
    // this.formModel.obs = this.projectForm.value.obs;
    // this.formModel.saving = this.projectForm.value.saving;
    // this.formModel.sla = this.projectForm.value.sla;
    // this.formModel.team = this.projectForm.value.team;
    // this.formModel.tasks = this.tasks;
    
    this.projects.push(this.formModel).then(res => console.log(res.key))
    this.clearForm();
  }

  removeProject(project) {

    this.af.database.object('/projectList/' + project.$key).remove().then(res => console.log('SUCCESS', res)).catch(error => console.log('ERROR', error));
  }

  addTaskInput() {

    this.thereIsTask = true;
  }
    
  addTask(){

    this.tasks.push(this.projectForm.value.task);
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

  clearForm(){
    this.tasks = [];
    this.thereIsTask = false;
    this.projectForm.reset();
  }
}
