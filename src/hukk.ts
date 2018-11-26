import {createServer, Server, IncomingMessage, ServerResponse} from 'http';

export interface HukkIncomingHandle {
  (data: any): Promise<void | any> | any;
}

export interface HukkConfig {
  endpoint: string;
  handle: HukkIncomingHandle;
}

export class Hukk {
  static DEFAULT_PORT: number = 5678;
  port: number = Hukk.DEFAULT_PORT;
  hooks: HukkConfig[] = [];
  server: Server;

  constructor() {
    this.server = createServer(this._handleRequest.bind(this));
  }

  register(hook: HukkConfig) {
    this.hooks.push(hook);
  }

  listen(port: number, callback?: () => void) {
    this.port = port || Hukk.DEFAULT_PORT;
    this.server.listen(this.port, '0.0.0.0', () => {
      this._onStart(callback);
    });
  }

  close(callback?: () => void) {
    if (this.server && this.server.listening) {
      this.server.close(callback);
    }
  }

  private _onStart(callback?: () => void) {
    callback && callback();
    if (!callback) {
      console.log(`Hukk is running on http://localhost:${this.port}`);
    }
  }

  private _handleRequest(req: IncomingMessage, res: ServerResponse) {
    const {method} = req;
    if (method === 'POST') {
      let body = '';
      req.on('data', data => {
        body += data;
      });
      req.on('end', () => {
        const bodyData = {body: this._jsonOrText(body)}
        res.writeHead(200, {'Content-Type': 'application/json'});
        this._runHook(req, bodyData, (err: any, data: any) => {
          if (err) {
            this._responseError(res, err.message);
          }
          this._responseData(res, data);
        });
      });
    } else {
      res.end(JSON.stringify({message: "Hukk doesn't support GET method!"}));
    }
  }

  private async _runHook(
    req: IncomingMessage,
    body: any,
    callback: (err: any, data: any) => void,
  ) {
    const {url} = req;
    const filterHooks: HukkConfig[] = this.hooks.filter(
      h => h.endpoint === url,
    );
    for (let i = 0; i < filterHooks.length; i++) {
      try {
        const hookResult = await Promise.resolve(filterHooks[i].handle(body));
        callback(null, hookResult);
      } catch (err) {
        callback(err, null);
      }
    }
  }

  private _jsonOrText(str: string) {
    try {
      const json = JSON.parse(str)
      return json
    } catch (err) {
      return str
    }
  }

  private _responseData(res: ServerResponse, data: any) {
    const result = JSON.stringify(data);
    res.end(result);
  }

  private _responseError(res: ServerResponse, message: string) {
    res.end(JSON.stringify({message}));
  }
}

const hukk = new Hukk();

export default hukk;
