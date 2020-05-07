import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'user',
    component: TabsPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'form1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../form1/form1.module').then(m => m.Form1Module)
          }
        ]
      },
      {
        path: 'emp-details',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employee-home/employee.module').then(m => m.EmployeeHomeModule)
          }
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../register/register.module').then(m => m.RegisterPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/user/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user/login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/user/form1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
