import {request} from 'http';
import hukk, {HukkIncomingHandle} from '../src/hukk';

const testPort = 3001;
const sendRequest = (
  endpoint: string,
  postData: any,
  callback: (err: any, data: any) => void,
) => {
  const options = {
    hostname: 'localhost',
    port: testPort,
    path: endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };
  const req = request(options, res => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', chunk => {
      body += chunk;
    });
    res.on('end', () => {
      callback(null, body);
    });
  });
  req.on('error', err => {
    callback(err, null);
  });
  req.write(postData);
  req.end();
};

const postData = JSON.stringify({action: 'test', foo: 'bar'});
describe('hukk', () => {
  beforeAll(done => {
    hukk.listen(testPort, done);
  });

  it('hukk get hooked', done => {
    const handle = jest.fn();
    hukk.register({endpoint: '/webhook', handle});
    sendRequest('/webhook', postData, (err, data) => {
      expect(handle).toBeCalled();
      done();
    });
  });

  it('hook response what it received', done => {
    const handle = (body: any) => {
      return body
    }
    hukk.register({endpoint: '/another-webhook', handle})
    sendRequest('/another-webhook', postData, (err, data) => {
      expect(data).toEqual(postData)
      done()
    })
  })

  afterAll(done => {
    hukk.close(done);
  });
});
