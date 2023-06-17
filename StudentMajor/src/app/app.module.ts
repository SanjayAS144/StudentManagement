import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat"
import { environment } from 'src/environment/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './component/role/role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AdminDashboardComponent } from './component/admin/admin-dashboard/admin-dashboard.component';
import { AddStudentComponent } from './component/admin/add-student/add-student.component';
import { AddTeacherComponent } from './component/admin/add-teacher/add-teacher.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader'
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { StudentDashBoardComponent } from './component/student/student-dash-board/student-dash-board.component';
import { SelectProctorModalComponent } from './component/modal/select-proctor-modal/select-proctor-modal.component';
import {MdbModalModule} from 'mdb-angular-ui-kit/modal';
import { TeacherDashboardComponent } from './component/teacher/teacher-dashboard/teacher-dashboard.component';
import { ChatComponent } from './component/teacher/chat/chat.component'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MaterialModule} from './shared/material.module';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { DatePipe } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StudentChatComponent } from './component/student/chat/chat.component';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { AddAnnouncementComponent } from './component/admin/add-announcement/add-announcement.component';
import { MatNativeDateModule, } from '@angular/material/core';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { EventViewerComponent } from './component/common/event-viewer/event-viewer.component';
import { DateToStringPipe } from './pipes/date-to-string';
import { EventStatusPipe } from './pipes/event-status';
import { AddEventComponent } from './component/teacher/add-event/add-event.component';
import { HttpClientModule } from '@angular/common/http';
import { AddresultsComponent } from './component/teacher/addresults/addresults.component';
import { ViewResultComponent } from './component/student/view-result/view-result.component';

const ngxLodaerConfiguration: NgxUiLoaderConfig = {
  "bgsColor": "#9ebfff",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 2,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#9ebfff",
  "fgsPosition": "center-center",
  "fgsSize": 40,
  "fgsType": "square-jelly-box",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(218,220,237,0.32)",
  "pbColor": "#f9cf62",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RoleComponent,
    AdminDashboardComponent,
    AddStudentComponent,
    AddTeacherComponent,
    StudentDashBoardComponent,
    SelectProctorModalComponent,
    TeacherDashboardComponent,
    ChatComponent,
    DateDisplayPipe,
    DateToStringPipe,
    StudentChatComponent,
    AddAnnouncementComponent,
    EventViewerComponent,
    EventStatusPipe,
    AddEventComponent,
    AddresultsComponent,
    ViewResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxLodaerConfiguration),
    NgxUiLoaderRouterModule,
    ToastrModule.forRoot(),
    MdbModalModule,
    MaterialModule,
    MdbFormsModule,
    InfiniteScrollModule,
    NgxEmojiPickerModule.forRoot(),
    MatDatepickerModule, 
    MatNativeDateModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
