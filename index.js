module.exports = function (form, substitutions) {
  return recurse(form, substitutions.headings, substitutions.terms)
}

function recurse (form, headings, terms) {
  var returned = {}
  if (form.conspicuous) returned.conspicuous = form.conspicuous
  returned.content = form.content.map(function (element) {
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
    } else if (element.hasOwnProperty('form')) {
      if (
        element.hasOwnProperty('heading') &&
        headings[element.heading]
      ) {
        return {
          heading: headings[element.heading],
          form: recurse(element.form, headings, terms)
        }
      } else {
        return {
          form: recurse(element.form, headings, terms)
        }
      }
    } else {
      return element
    }
  })
  return returned
}
