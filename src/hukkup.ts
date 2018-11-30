import {request} from 'http';

export interface HukkupOptions {
  hostname: string;
  port: number;
  endpoint: string;
  data: any;
}

export const hukkup = (
  {hostname, port, endpoint, data}: HukkupOptions,
  callback: (err: any, data: any) => void,
) => {
  const body = JSON.stringify(data)
  const opts = {
    hostname,
    port,
    path: endpoint,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  const req = request(opts, res => {
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

  req.write(body);
  req.end();
};

export const hukkupAsync = (opts: HukkupOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    hukkup(opts, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
