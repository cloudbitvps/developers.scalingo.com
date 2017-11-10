requirejs.config({
  waitSeconds: 200,
  paths: {
    'docsearch': '//cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min'
  },
  shim: {
    'search': ['docsearch'],
  }
})

requirejs([
  'search'
])
