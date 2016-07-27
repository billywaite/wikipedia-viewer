$(document).ready(function () {
    var articles = $('.articles');
    var input = $('input');
    var button = $('button');
    var toSearch = '';
    var searchUrl = 'https://en.wikipedia.org/w/api.php';

    var ajaxArticleData = function () {
        $.ajax({
            url: searchUrl,
            dataType: 'jsonp',
            data: {
                //main parameters
                action: 'query',
                format: 'json',

                generator: 'search',
                    //parameters for generator
                    gsrsearch: toSearch,
                    gsrnamespace: 0,
                    gsrlimit: 10,

                prop: 'extracts',
                    //parameters for extracts
                    exchars: 200,
                    exlimit: 'max',
                    explaintext: true,
                    exintro: true,
            },
            success: function (json) {
                var pages = json.query.pages;
                $.map(pages, function (page) {
                var hyperLink = 'https://en.wikipedia.org/?curid=' + page.pageid;
                 var pageElement = $('<div>');
                    
//get the article title
pageElement.append($('<h2>').text(page.title));

//get the article text
                    pageElement.append($('<p>').text(page.extract));
pageElement.append($('<a>').text("Click to view in Wikipedia").attr('href', hyperLink).attr('role', button));
                    pageElement.append($('<br>'));
//append everything to the articles variable in html
articles.append(pageElement);
                });
            }
        });
    };

    button.click(function () {
        articles.empty();
        toSearch = input.val();
        ajaxArticleData();
      $( ".articles" ).slideUp( 300 ).delay( 500 ).fadeIn( 400 );
    });
});