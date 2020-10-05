package stimsulsoftreports
{
	import org.apache.royale.html.Container;
	import pt.solidsoft.framework.alert.Alert;

    COMPILE::JS
	public class ReportViewer extends Container
	{
		public static const PRINT_TYPE_ALL:int = 1;
		public static const PRINT_TYPE_PDF:int = 2;
		public static const PRINT_TYPE_NONE:int = 3;

        private var stimulsoftReports:StimulsoftReports;

		override public function addedToParent():void
		{
			super.addedToParent();
            percentWidth = 100;
            percentHeight = 100;

            stimulsoftReports = new StimulsoftReports();
            stimulsoftReports.initViewer(id, printType, showEMail, showSave);
            stimulsoftReports.addEventListener(SendEMailEvent.SENDEMAILREPORT, onSendEMailReport);
		}

        public var printType:int = PRINT_TYPE_PDF;
        public var showEMail:Boolean = false;
        public var showSave:Boolean = true;

        public function loadReportDefinition(definition:String, showWatermark:Boolean):void
        {
            stimulsoftReports.loadReportDefinition(definition, showWatermark);
        }

        public function loadReportFile(file:String, showWatermark:Boolean):void
        {
            stimulsoftReports.loadReportFile(file, showWatermark);
        }

        public function loadReportData(data:Array, parameters:Array = null):void
        {
            stimulsoftReports.loadReportData(data, parameters);
        }

        private function onSendEMailReport(event:SendEMailEvent):void
        {
            Alert.show(event.email + "; " + event.subject + "; " + event.message + "; " + event.fileName + "; " + event.fileData);
        }        
	}
}
