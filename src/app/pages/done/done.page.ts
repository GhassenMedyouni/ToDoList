import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  currentDate: string;
  newTask = '';
  allTasks = [] ;


  constructor(private angFire: AngularFireDatabase, private afAuth: AngularFireAuth) {
    const todayDate = new Date();
    const options = {weekday: 'long', month: 'long' , day: 'numeric'};
    this.currentDate = todayDate.toLocaleDateString('en-en', options);
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    // @ts-ignore
    this.angFire.list('Tasks/',
            ref => ref.orderByChild('checked').equalTo(true))
        .snapshotChanges(['child_added'])
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
                    // tslint:disable-next-line:triple-equals
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

