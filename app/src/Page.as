package
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	
	public class Page
	{
		private var url:String;
		private var cache:Boolean;
		private var request:URLRequest;
		private var loader:URLLoader;
		
		public function Page(url:String, cache:Boolean = false)
		{
			this.url = url;
			load(cache);
		}
				
		public function load(cache:Boolean = false):void {
			this.cache = cache;
			request = new URLRequest(url);
			loader = new URLLoader();
			loader.dataFormat = "text";//
			loader.addEventListener(Event.COMPLETE, complete);
			loader.load(request);
		}
		
		public function complete(event:Event):void {
			var loader:URLLoader = URLLoader(event.target);
			loader.removeEventListener(Event.COMPLETE, complete);
			var data:String = loader.data.toString().replace(/<!doctype[^>]*>[\s|\n]*/i, "");
			Scraper.callback(url, data, cache);
		}
	}
}