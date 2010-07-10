# jQuery Scraper

Simple, Cross-Domain Web Scraping with jQuery

## Usage
    
    $.scrape("http://github.com", function(document) {
      $("body").append(document);
    });
    
or more explicitly:

    $.scrape({
      url: "http://github.com",
      success: function(document) {
        
      }
    });

you can specify json to get the objects out in a hash of tags:
    
    $.scrape({
      url: "http://github.com",
      format: "json", // or "string"
      success: function(data) {
        // data["link"] = [{href:"http://github.com"}]
        // data["meta"] = [{content:"hello world", name:"description"}]
        // ...
      }
    });

### Why?

- Because you can't grab web pages from javascript using javascript.  You have to go through either a server side script, or flash.  This uses Flash.
- Server side processing of webpages takes up a lot of resources.  Pass that off to the client.