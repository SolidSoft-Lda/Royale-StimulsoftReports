package stimsulsoftreports
{
	import org.apache.royale.events.Event;

	public class SaveEvent extends Event
	{
        public static const SAVEREPORT:String = "saveReport";

        public var jsonReport:String;
		
		public function SaveEvent()
		{
			super(SAVEREPORT);
		}
	}
}