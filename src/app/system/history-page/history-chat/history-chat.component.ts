import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-chat',
  templateUrl: './history-chat.component.html',
  styleUrls: ['./history-chat.component.scss']
})
export class HistoryChatComponent implements OnInit {

  @Input() data: any[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // chat size [width, height]
  view: any[] = [545, 355];

  constructor() { }

  ngOnInit() {
  }

}
