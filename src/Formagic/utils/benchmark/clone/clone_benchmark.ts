import b from 'benny'

import data from './data.json' assert { type: 'json' }
import clone from '../../clone'
import clone2 from './clone2'
import clone3 from './clone3'
b.suite(
  'test clone methods',
  b.add('clone clone1 object', () => {
    clone(data)
  }),
  b.add('clone clone2 object', () => {
    clone2(data)
  }),
  b.add('clone clone3 object', () => {
    clone3(data)
  }),
  b.cycle(),
  b.complete()
).then(r => console.log(r))
