import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../services/database.service";
import {Auth} from "../../services/auth0.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as _ from 'lodash';

declare let $:any;

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit {

  isLoading: boolean = false;
  userNotes: any[];
  anyError: Error;
  formAddNote: FormGroup;
  countChars: number = 0;
  loadingState: string = 'default';


  constructor(private db: DatabaseService,
              private auth: Auth,
              private formBuilder: FormBuilder) {

    this.formAddNote = formBuilder.group({
      "note_id": this.db.generateUniqueId(),
      "user_id": this.auth.loggedUserId(),
      "content": ['',[Validators.required,Validators.maxLength(430)]],
      "style": ['default',Validators.required],
      "creation_date": new Date()
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.db.getUserNotes(this.auth.loggedUserId())
      .subscribe(notes => {
        this.userNotes = notes;
        this.isLoading = false;
      },
        error => this.anyError = error
      );
  }

  addNewNote(){
    this.isLoading = true;
    this.db.createUserNote(this.formAddNote.value).subscribe(response =>{
      this.userNotes.push(response);
      this.resetForm();
      $('#addNote').modal('hide');
      this.isLoading = false;
    })
  }

  resetForm(){
    this.formAddNote.reset({
      "note_id": this.db.generateUniqueId(),
      "user_id": this.auth.loggedUserId(),
      "content": '',
      "style": 'default',
      "creation_date": new Date()
    })
  }

  countTextarea(){
    this.countChars = this.formAddNote.value.content.length
  }

  deleteNote(noteId: string){
    this.isLoading = true;
    this.loadingState = 'delete';
    this.db.deleteNote(noteId).subscribe(() => {
      _.remove(this.userNotes, {
        "note_id": noteId
      });
        this.isLoading = false;
        this.loadingState = 'default';
    },
      error => this.anyError = error)
  }



}
