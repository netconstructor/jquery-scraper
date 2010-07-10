package {
	
	import flash.external.ExternalInterface;
   
	public class Scraper
	{
		protected static var requests:Object = {};
		
		public function Scraper()
		{
			ExternalInterface.addCallback("request", request);
        }
		
		public function request(url:String):void
		{
			Scraper.request(url);
		}
		
		public static function request(url:String, cache:Boolean = false):void
		{
			if (!requests[url]) {
				requests[url] = new Page(url, cache);
			} else {
				Page(requests[url]).load(cache);
			}
		}
		
		public static function callback(url:String, data:String, cache:Boolean = false):void
		{
			if (requests[url]) {
				ExternalInterface.call("$.scraper.callback", url, data);
				if (!cache) {
					requests[url] = null;
					delete requests[url];
				}
			}
		}
	}
}