/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */
jQuery.noConflict()(function($){
$(function () {
    'use strict';

    var companyArray = $.map(companies, function (value, key) { return { value: value, data: key }; });


    // Initialize ajax autocomplete:
    $('#autocomplete-ajax').autocomplete({
        // serviceUrl: '/autosuggest/service/url',
        lookup: companyArray,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        },
        onInvalidateSelection: function() {
            $('#selction-ajax').html('You selected: none');
        }
    });


    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-custom-append').autocomplete({
        lookup: companyArray,
        appendTo: '#suggestions-container'
    });

    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-dynamic').autocomplete({
        lookup: companyArray
    });
});
});
