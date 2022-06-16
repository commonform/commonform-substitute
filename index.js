module.exports = function (form, substitutions) {
  return recurse(
    form,
    substitutions.headings || {},
    substitutions.terms || {},
    substitutions.blanks || {},
    { value: 0 }
  )
}

function recurse (form, headings, terms, blanks, blankCounter) {
  var returned = {}
  if (form.conspicuous) returned.conspicuous = form.conspicuous
  returned.content = form.content.map(function (element) {
    if (typeof element === 'string') return element
    if (
      element.hasOwnProperty('use') &&
      terms[element.use]
    ) {
      return {use: terms[element.use]}
    } else if (
      element.hasOwnProperty('definition') &&
      terms[element.definition]
    ) {
      return {definition: terms[element.definition]}
    } else if (
      element.hasOwnProperty('reference') &&
      headings[element.reference]
    ) {
      return {reference: headings[element.reference]}
    } else if (element.hasOwnProperty('blank')) {
      blankCounter.value++
      var value = blanks[blankCounter.value]
      if (typeof value === 'string') return value
      return element
    } else if (element.hasOwnProperty('form')) {
      if (element.hasOwnProperty('heading')) {
        if (headings[element.heading]) {
          return {
            heading: headings[element.heading],
            form: recurse(element.form, headings, terms, blanks, blankCounter)
          }
        } else {
          return {
            heading: element.heading,
            form: recurse(element.form, headings, terms, blanks, blankCounter)
          }
        }
      } else {
        return {
          form: recurse(element.form, headings, terms, blanks, blankCounter)
        }
      }
    } else {
      return element
    }
  })
  return returned
}
