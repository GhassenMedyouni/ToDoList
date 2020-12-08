import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'toDo',
        loadChildren: () => import('../pages/to-do/to-do.module').then( m => m.ToDoPageModule)
      },
      {
        path: 'done',
        loadChildren: () => import('../pages/done/done.module').then( m => m.DonePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
