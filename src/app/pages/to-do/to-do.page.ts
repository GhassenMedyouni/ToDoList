import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  currentDate: string;
  newTask = '';
  allTasks = [] ;
  public userId: string;

  constructor(private angFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    const todayDate = new Date();
    const options = {weekday: 'long', month: 'long' , day: 'numeric'};
    this.currentDate = todayDate.toLocaleDateString('en-en', options);
    afAuth.onAuthStateChanged((user) => {
      if (user){
        this.userId = user.uid;
      } else {
        console.log('vide');
      }
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  addNewTask() {
    this.angFire.list('Tasks/').push({
      text : this.newTask,
      checked: false,
      date: new Date().toISOString(),
      userId: this.userId
    });
    this.newTask = '';
  }

  getTasks() {

    // @ts-ignore
    this.angFire.list('Tasks/').snapshotChanges(['child_added'])
        .subscribe(
            (reponse) => {
              console.log(reponse);

              this.allTasks = [];
              // tslint:disable-next-line:no-shadowed-variable
              reponse.forEach(element => {
                // console.log(element.payload);
                this.allTasks.push({
                  key : element.key,
                  text : element.payload.exportVal().text,
                  checked : element.payload.exportVal().checked,
                  date : element.payload.exportVal().date.substring(11, 16)
                });
              });
            }
        );

  }

  changeCheckedState(tsk) {
    this.angFire.object(`Tasks/${tsk.key}/checked`).set(tsk.checked);
  }

  deleteTask(id) {
    this.angFire.list('Tasks/').remove(id);
    this.getTasks();
  }

}
