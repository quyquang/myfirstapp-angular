import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  constructor(
    @Inject('serverId') public serverId: number,
    @Inject('serverStatus') public serverStatus: string = "offline",
    @Inject('serverName') public serverName: string
  ) {}
}
