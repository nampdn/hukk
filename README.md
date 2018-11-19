# hukk
Portable webhook for NodeJS micro-service

## Installation

```bash
yarn add hukk
```

## Usage

### Create webhook server:
```javascript
import hukk from 'hukk'

// Register new hook object
hukk.register({
  endpoint: '/webhook',
  handle: (data) => {
    console.log(data)
  }
}) 

hukk.listen(3000, () => {
  console.log('Hook server listening on port 3000')
})
```

### Send hook to another server
```javascript
import {hukkup} from 'hukk'

const data = {bar: 'boo'}
hukkup({host: 'localhost', port: 3000, endpoint: '/webhook', data}, (err, data) => {
  if (err) {
    console.error(err)
  }
  console.log('Response: ', data) // {"body": {"bar": "boo"}}
})
```
