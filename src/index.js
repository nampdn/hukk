import {createServer} from 'http'

export class Hukk {
  constructor() {
    this.port = 3000
  }

  register(hook) {}

  listen = (port) => {
    this.server = createServer(this._handleRequest)
    this.server.listen('localhost', port || 3000, () => {
    })
  }

  _onStart = () => {
    console.log('Hukk is running!')
  }

  _handleRequest = (req, res) => {}
}

const hukk = new Hukk()

export default hukk
