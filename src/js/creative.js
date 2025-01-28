/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function ($) {


    $('.navbar-toggle').bind('click', function (event) {
        $('.navbar-collapse').toggleClass('collapse');
    });

    fetch("/latestposts", {
        method: "GET",
        referrerPolicy: "no-referrer"
    })
        .then(function(response) { return response.json() })
        .then(function(data) {

            var items = [];
            $.each(data, function (key, val) {
                items.push('<div class="col-md-6 col-sm-6"> <h3><a href="' + val.link + '" target="_blank">' + val.title + '</a></h3> <p> ' +
                   val.summary.substring(0, 120).trim() + '...'
                    + '</p> <a href="' + val.link + '" target="_blank">Read article</a> </div>');
            });
            $(".blog-feed").append(items.join(""));
        });

})(jQuery); // End of use strict
