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

const hukker = hukk()

// Register new hook object
const handler = (req, res, data) => {
  const {bar} = data
  return {
    foo: 
  }
}

hukker.register({
  endpoint: '/webhook',
  handler: (req, res, data) => {
    return {
      foo: 'bar'
    }
  }
})

hukker.listen(3000)
```

### Send hook to another server
```javascript
import {hukkup} from 'hukk'

const data = {bar: 'boo'}
hukkup({host: 'localhost', port: 3000, endpoint: '/webhook', data}, (err, data) => {
  if (err) {
    console.error(err)
  }
  console.log('Response: ', data)
})
```
