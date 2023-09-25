import { Component } from '@angular/core';
import { ServerComponent } from '../server/server.component';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  serverName: string = '';
  currentId: number = 0;
  allowCreateServer: boolean = true;
  servers: ServerComponent[] = [];
  onCreateServer() {
    this.servers.push(
      new ServerComponent(this.currentId, undefined, this.serverName)
    );
    this.currentId = this.currentId + 1;
    setTimeout(() => {
        this.allowCreateServer = false;
    }, 2000)

  }
}
