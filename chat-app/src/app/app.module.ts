import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatCardModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatScreenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
