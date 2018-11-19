# hukk 
Portable webhook for NodeJS micro-service

[![npm version](https://badge.fury.io/js/hukk.svg)](https://badge.fury.io/js/hukk) [![Build Status](https://travis-ci.com/nampdn/hukk.svg?branch=master)](https://travis-ci.com/nampdn/hukk)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnampdn%2Fhukk.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnampdn%2Fhukk?ref=badge_shield)
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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fnampdn%2Fhukk.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fnampdn%2Fhukk?ref=badge_large)