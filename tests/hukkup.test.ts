import {hukkup} from '../src/hukkup';
import {createServer, Server} from 'http';

const port = 9999;
let server: Server;

describe('hukkup', () => {
  beforeAll(done => {
    server = createServer((req, res) => {
      const {method} = req;
      if (method === 'POST') {
        let body = '';
        req.on('data', data => {
          body += data;
        });
        req.on('end', () => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(body);
        });
      }
    });
    server.listen(port, 'localhost', done);
  });

  it('should send POST request to a server', done => {
    const postData = {foo: 'bar'};
    hukkup(
      {hostname: 'localhost', endpoint: '/webhook', data: postData, port},
      (err, data) => {
        expect(err).toBeNull();
        expect(data).toBeTruthy();
        expect(JSON.parse(data)).toEqual(postData);
        done();
      },
    );
  });

  afterAll(done => {
    if (server.listening) {
      server.close(done);
    }
  });
});
