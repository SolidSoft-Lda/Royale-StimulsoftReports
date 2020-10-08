# Royale-StimulsoftReports

A library for Apache Royale Framework (https://royale.apache.org) that wraps the Stimulsoft Reports JS library (https://www.stimulsoft.com/en/products/reports-js). Stimulsoft Reports.JS, designed on JavaScript and HTML5 technologies, is a robust set of components for working with reports. *Note*: you need a license to use this framework.

Setup
````actionscript
//if you comment this line, you can test this library in the trial mode
StimulsoftReports.setLicenseKey("YOUR LICENSE KEY HERE");

//you can ignore this lines for English language
//load from a file => this method shows a warning on Google Chrome about access the xml file
StimulsoftReports.setLanguage("LANGUAGE CODE"); //ex: "pt", "es"
//load from a string => this method may avoid at all any browser warning but requires that you load the language data from another approach (for example from server thru RemoteObject)
StimulsoftReports.setLocalization("LOCALIZATION XML STRING");
`````

Global parameters (parameters added once and shared between all reports)
````actionscript
Ex:
var parameters:Array = [];
parameters.push(new ReportParameter("CompanyName", "My Cool Company"));
parameters.push(new ReportParameter("CompanyEMail", "me@mycoolcompany.com"));
StimulsoftReports.setParameters(parameters);
`````

Add report viewer component
````xml
<!--
Aditional parameters:
printType (ALL = 1, PDF = 2, NONE = 3): Normal print + preview, print to PDF, hide print button
showEMail: Show or hide e-mail button
showSave: Show or hide save button

Events:
SendEMailEvent: email, subject, message and file to use (ex: communicate to server side to send the e-mail)
-->
<stimsulsoftreports:ReportViewer id="reportViewer" width="100%" height="100%"/>
`````

Add report designer component
````xml
<!--
Events:
SaveEvent: jsonReport (report definition in json file format)
-->
<stimsulsoftreports:ReportDesigner id="reportDesigner" width="100%" height="100%"/>    
`````

Usage (show viewer)
````actionscript
public class DemoModel
{
  public var ClientCode:String;
  public var ClientName:String;
}
`````

````actionscript
//the first parameter is the report definition (as alternative you can use loadReportFile with the relative or full path)
//the second parameter show or hide report watermark
reportViewer.loadReportDefinition("REPORT DEFINITION", false);
`````

````actionscript
//local parameter
var parameters:Array = new Array();
parameters.push(new ReportParameter("EntityType", "Clients"));

//data
var clients:Array = new Array();

var client1:DemoModel = new DemoModel();
client1.ClientCode = "001";
client1.ClientName = "Hugo";
clients.push(client1);

var client2:DemoModel = new DemoModel();
client2.ClientCode = "002";
client2.ClientName = "Ana";
clients.push(client2);

var client3:DemoModel = new DemoModel();
client3.ClientCode = "003";
client3.ClientName = "Carlos";
clients.push(client3);

reportViewer.loadReportData(clients, parameters);
`````

<img src="https://raw.githubusercontent.com/SolidSoft-Lda/Royale-StimulsoftReports/main/src/ReportViewer.png">

Usage (show designer)
````actionscript
//the parameter is the report definition (as alternative you can use designReportFile with the relative or full path)
reportDesigner.designReportDefinition("REPORT DEFINITION");
`````

<img src="https://raw.githubusercontent.com/SolidSoft-Lda/Royale-StimulsoftReports/main/src/ReportDesigner.png">
