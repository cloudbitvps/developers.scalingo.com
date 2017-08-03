requirejs.config({
  waitSeconds: 200,
  paths: {
    'docsearch': '//cdn.jsdelivr.net/docsearch.js/1/docsearch.min'
  },
  shim: {
    'search': ['docsearch'],
  }
})

requirejs([
  'search'
])
