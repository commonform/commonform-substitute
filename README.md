substitute terms and headings in Common Forms

```javascript
var assert = require('assert')
var substitute = require('commonform-substitute')

assert.deepEqual(
  substitute(
    {
      content: [
        {
          heading: 'Banana',
          form: {
            content: [{definition: 'Apple'}]
          }
        },
        {
          form: {
            content: [
              {use: 'Apple'},
              {reference: 'Banana'}
            ]
          }
        }
      ]
    }, {
      terms: {'Apple': 'Orange'},
      headings: {'Banana': 'Pear'}
    }
  ),
  {
    content: [
      {
        heading: 'Pear',
        form: {
          content: [{definition: 'Orange'}]
        }
      },
      {
        form: {
          content: [
            {use: 'Orange'},
            {reference: 'Pear'}
          ]
        }
      }
    ]
  }
)
```
