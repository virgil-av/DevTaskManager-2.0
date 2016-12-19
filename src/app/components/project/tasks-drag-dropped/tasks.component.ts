import { Component, OnInit } from '@angular/core';
import {DragulaService} from "ng2-dragula/components/dragula.provider";
import {ParentChildrenService} from "../../../services/parent-children.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  task: any;

  public many: any = ["one","two","three","four","five","six","seven","eight","nine","ten","11","12"];
  public many2: any = [];
  public many3: any = [];

  constructor(private dragulaService: DragulaService, private pcService: ParentChildrenService) {

  }


  ngOnInit() {
    this.pcService.projectInfo$.subscribe(response => {
      console.log(response, 'hey it works')
      this.task = response

      this.dragulaService.setOptions(response, {
        revertOnSpill: true
      });
    })


    this.dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

  }

  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
    console.log(args, typeof args[1].id, args[1].id)
    console.log(this.many,this.many2,this.many3)

    if(args[1].id == "col2") {
      console.log("I work because I hit column 2")
    }else if(args[1].id == "col3"){
      console.log("this is column 3")
    }else{
      console.log("hmm")
    }

  }

}
