import {createServer, Server} from 'http';

export interface HukkIncomingHandle {
  (data: any) : void
}

export interface HukkConfig {
  endpoint: string
  handle: HukkIncomingHandle
}

export class Hukk {
  port: number
  hooks: HukkConfig[]
  server: Server
  constructor() {
    this.port = 3000;
    this.hooks = [];
  }

  register(hook: HukkConfig) {
    this.hooks.push(hook)
  }

  listen(port) {
    this.server = createServer(this._handleRequest);
    this.server.listen('localhost', port || 3000, () => {});
  }

  _onStart() {
    console.log('Hukk is running!');
  }

  _handleRequest(req, res) {}
}

const hukk = new Hukk();

export default hukk;
