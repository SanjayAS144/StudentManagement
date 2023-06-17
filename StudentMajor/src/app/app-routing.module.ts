import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { RoleComponent } from './component/role/role.component';
import { AddStudentComponent } from './component/admin/add-student/add-student.component';
import { AddTeacherComponent } from './component/admin/add-teacher/add-teacher.component';
import { ChatComponent } from './component/teacher/chat/chat.component';
import { StudentChatComponent } from './component/student/chat/chat.component';
import { AddAnnouncementComponent } from './component/admin/add-announcement/add-announcement.component';
import { EventViewerComponent } from './component/common/event-viewer/event-viewer.component';
import { AddEventComponent } from './component/teacher/add-event/add-event.component';
import { AddresultsComponent } from './component/teacher/addresults/addresults.component';
import { ViewResultComponent } from './component/student/view-result/view-result.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'role',component:RoleComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'addStudent',component:AddStudentComponent},
  {path:'addTeacher',component:AddTeacherComponent},
  {path:'chat',component:ChatComponent},
  {path:'studentChat',component:StudentChatComponent},
  {path:'addAnnouncement',component:AddAnnouncementComponent},
  {path:'viewEvents',component:EventViewerComponent},
  {path:'addEvent',component:AddEventComponent},
  {path:'addResults',component: AddresultsComponent},
  {path:'viewResults',component: ViewResultComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
