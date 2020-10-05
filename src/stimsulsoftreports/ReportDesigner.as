package stimsulsoftreports
{
	import org.apache.royale.html.Container;
	import pt.solidsoft.framework.alert.Alert;

    COMPILE::JS
	public class ReportDesigner extends Container
	{
        private var stimulsoftReports:StimulsoftReports;

		override public function addedToParent():void
		{
			super.addedToParent();
            percentWidth = 100;
            percentHeight = 100;

            stimulsoftReports = new StimulsoftReports();
            stimulsoftReports.initDesigner(id);
            stimulsoftReports.addEventListener(SaveEvent.SAVEREPORT, onSaveReport);
		}

        public function designReportDefinition(definition:String):void
        {
            stimulsoftReports.designReportDefinition(definition);
        }

        public function designReportFile(file:String):void
        {
            stimulsoftReports.designReportFile(file);
        }

        private function onSaveReport(event:SaveEvent):void
        {
            Alert.show(event.jsonReport);
        }
	}
}
