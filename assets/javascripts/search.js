define(['docsearch'], function (docsearch) {
  var search = docsearch({
    apiKey: '3f061836c3dbaf1ae75994355b4ce7e2',
    indexName: 'scalingo',
    inputSelector: '#search-input'
  })
  $(window).scroll(function() {
    search.autocomplete.autocomplete.close(); // remove the dropdown
    search.autocomplete.autocomplete.setVal(''); // clear the input
  });

  $(".sidebar-nav").scroll(function(){
    search.autocomplete.autocomplete.close(); // remove the dropdown
    search.autocomplete.autocomplete.setVal(''); // clear the input
  })

})
