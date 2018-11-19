import {createServer, Server} from 'http';

export interface HukkIncomingHandle {
  (data: any): void;
}

export interface HukkConfig {
  endpoint: string;
  handle: HukkIncomingHandle;
}

export class Hukk {
  static DEFAULT_PORT: number = 5678;
  port: number;
  hooks: HukkConfig[];
  server: Server;

  constructor() {
    this.port = Hukk.DEFAULT_PORT;
    this.hooks = [];
  }

  register(hook: HukkConfig) {
    this.hooks.push(hook);
  }

  listen(port, callback?: () => void) {
    this.port = port || Hukk.DEFAULT_PORT;
    this.server = createServer(this._handleRequest);
    this.server.listen(this.port, 'localhost', () => {
      this._onStart();
      callback && callback();
    });
  }

  close(callback: () => void) {
    if (this.server && this.server.listening) {
      this.server.close(callback);
    }
  }

  private _onStart() {
    console.log(`Hukk is running on http://localhost:${this.port}`);
  }

  private _handleRequest(req, res) {
    const {url, method} = req;
    if (method === 'POST') {
      let body = '';
      req.on('data', data => {
        body += data;
      });
      req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end('{"status": "received"}');
      });
    } else {
      res.end(JSON.stringify({message: "Hukk doesn't support GET method!"}));
    }
  }
}

const hukk = new Hukk();

export default hukk;
