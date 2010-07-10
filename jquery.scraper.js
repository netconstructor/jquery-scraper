/*
$.scrape({
  url: "http://github.com",
  format: "json" // or "string",
  success: function(data) {
    
  }
})
*/
(function($) {
  
  $.scraper = {
    swf: function(id) {
      return $("#" + id).get(0);
    },
    inProcess: {},
    processing: function(url) {
      return $.scraper.inProcess[url] != null;
    },
    get: function(options) {
      var url = options.url;
      var swf_id = options.swf;
      if ($.scraper.processing(url)) {
        return null;
      } else {
        $.scraper.inProcess[url] = options;
        return $.scraper.swf(swf_id).request(url);
      }
    },
    callback: function(url, data) {
      if ($.scraper.processing(url)) {
        var options = $.scraper.inProcess[url];
        if (options.format == "json") {
          data = $.scraper.json(data);
        }
        options.success(data);
        $.scraper.inProcess[url] = null;
      }
    },
    json: function(data) {
      var element = {};
      var results = {};
      HTMLParser(data, {
  			start: function(tag, attrs, unary) {
          element = {};
  			  for (var i = 0; i < attrs.length; i++) {
  			    var attr = attrs[i];
  			    element[attr.name] = attr.value;
			    }
  			},
  			end: function(tag) {
  			  var key = tag.toLowerCase();
  			  if (!results[key])
  			    results[key] = [];
  			  results[key].push(element);
  			}
  		});
  		return results;
    },
    string: function(data) {
      var results = "";
      
      HTMLParser(data, {
  			start: function( tag, attrs, unary ) {
  				results += "<" + tag;
  				for ( var i = 0; i < attrs.length; i++ ) {
  					results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
  				}
  				results += (unary ? "/" : "") + ">";
  			},
  			end: function( tag ) {
  				results += "</" + tag + ">";
  			},
  			chars: function( text ) {
  				results += text;
  			},
  			comment: function( text ) {
  				results += "<!--" + text + "-->";
  			}
  		});
  		
  		return results;
    }
  }
  
  $.scrape = function(options) {
    
    if (!options.swf) {
      alert("Please specify a swf id");
    }
    if (!options.url) {
      alert("Please specify a url");
    }
    
    $.scraper.get(options);
  }
  
  if (typeof swfobject == "undefined") {
    //$.getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js")
  }
  if (typeof HTMLParser == "undefined") {
    //$.getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js")
  }
})(jQuery)