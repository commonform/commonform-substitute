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
            content: [
              {definition: 'Apple'},
              {blank: ''}
            ]
          }
        },
        {
          heading: 'Rock',
          form: {
            content: [
              {use: 'Apple'},
              {reference: 'Banana'},
              {blank: ''}
            ]
          }
        }
      ]
    }, {
      terms: {'Apple': 'Orange'},
      headings: {'Banana': 'Pear'},
      blanks: {'2': 'Watermelon'}
    }
  ),
  {
    content: [
      {
        heading: 'Pear',
        form: {
          content: [
            {definition: 'Orange'},
            {blank: ''}
          ]
        }
      },
      {
        heading: 'Rock',
        form: {
          content: [
            {use: 'Orange'},
            {reference: 'Pear'},
            'Watermelon'
          ]
        }
      }
    ]
  }
)
```
