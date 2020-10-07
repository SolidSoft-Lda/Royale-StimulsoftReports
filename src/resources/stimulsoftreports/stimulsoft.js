var script = document.createElement("script");
script.setAttribute("src", "resources/stimulsoftreports/scripts/stimulsoft.reports.js");
document.head.appendChild(script);

window.onload = function()
{
	var script = document.createElement("script");
	script.setAttribute("src", "resources/stimulsoftreports/scripts/stimulsoft.viewer.js");
	document.head.appendChild(script);
	
	var script = document.createElement("script");
	script.setAttribute("src", "resources/stimulsoftreports/scripts/stimulsoft.designer.js");
	document.head.appendChild(script);
}

var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "resources/stimulsoftreports/css/stimulsoft.viewer.office2013.whiteblue.css");
document.head.appendChild(link);

var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", "resources/stimulsoftreports/css/stimulsoft.designer.office2013.whiteblue.css");
document.head.appendChild(link);

var stimulsoftReportsInstance;
var stimulsoftReportsParameters;

class StimulsoftReports
{
	#viewer;
	#designer;

	constructor()
	{
		stimulsoftReportsInstance = this;
        this.events = {};
    }

	addEventListener(event, callback)
	{
		//create the event if not exists
		if (this.events[event] === undefined)
			this.events[event] = { listeners: [] }

		this.events[event].listeners.push(callback);
	}

	dispatchEvent(event, details)
	{
		this.events[event].listeners.forEach((listener) => { listener(details); });
	}
	
	static setLicenseKey(licenseKey)
	{
		Stimulsoft.Base.StiLicense.key = licenseKey;
	}

	static setLocalization(localization)
	{
		Stimulsoft.Base.Localization.StiLocalization.setLocalization(localization);
	}

	static setLanguage(language)
	{
		if (language != "en")
				Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("resources/stimulsoftreports/localizations/" + language + ".xml", true);
	}

	static setParameters(parameters)
	{
		stimulsoftReportsParameters = parameters;
	}

	initViewer(renderArea, printType, showEMail, showSave)
	{
		//specify necessary options for the viewer
		var options = new Stimulsoft.Viewer.StiViewerOptions();
		options.height = "100%";
		options.appearance.scrollbarsMode = true;
		options.appearance.showTooltips = false;
		options.exports.showExportToDocument = false;
		options.toolbar.showAboutButton = false;
		options.toolbar.showOpenButton = false;
		options.toolbar.showDesignButton = false;
		if (printType == 2)
			options.toolbar.printDestination = Stimulsoft.Viewer.StiPrintDestination.Pdf;
		else if (printType == 3)
			options.toolbar.showPrintButton = false;
		options.toolbar.showSendEmailButton = showEMail;
		options.toolbar.showSaveButton = showSave;
		options.appearance.htmlRenderMode = Stimulsoft.Report.Export.StiHtmlExportMode.Table;

		//create an instance of the viewer
		this.#viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false);
		this.#viewer.renderHtml(renderArea);
		this.#viewer.report = new Stimulsoft.Report.StiReport();

		this.#viewer.onEmailReport = function(args)
		{
			var emailArgs =
			{
				email: args.settings.email,
				subject: args.settings.subject,
				message: args.settings.message,
				fileName: args.fileName,
				fileData: args.data
			};
			stimulsoftReportsInstance.dispatchEvent('sendEMailReport', emailArgs);
		}
	}

	initDesigner(renderArea)
	{
		//specify necessary options for the viewer
		var options = new Stimulsoft.Designer.StiDesignerOptions();
		options.height = "100%";
		options.appearance.allowChangeWindowTitle = false;
		options.appearance.showTooltips = false;
		options.toolbar.showFileMenu = false;
		options.toolbar.showPreviewButton = false;
		options.showLocalization = false;

		//create an instance of the designer
		this.#designer = new Stimulsoft.Designer.StiDesigner(options, "Designer", false);
		this.#designer.renderHtml(renderArea);
		this.#designer.report = new Stimulsoft.Report.StiReport();	

		this.#designer.onSaveReport = function(args)
		{
			stimulsoftReportsInstance.dispatchEvent('saveReport', { jsonReport: args.report.saveToJsonString() });
		}
	}

	loadReportDefinition(definition, showWatermark)
	{
		var report = new Stimulsoft.Report.StiReport();
		report.load(definition);
		this.#viewer.report = report;
		this.loadReport(showWatermark);
		return report;
	}

	loadReportFile(file, showWatermark)
	{
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile(file);
		this.#viewer.report = report;
		this.loadReport(showWatermark);
		return report;
	}

	loadReport(showWatermark)
	{
		this.#viewer.report.pages.list.forEach(function(page)
		{
			page.watermark.enabled = showWatermark;
		});
	}

	loadReportData(data, parameters)
	{
		if (stimulsoftReportsParameters != null)
		{
			this.#viewer.report.dictionary.variables.list.forEach(function(variable)
			{
				stimulsoftReportsParameters.forEach(function(parameter)
				{
					if (variable.name == parameter.name)
					{
						variable.valueObject = parameter.value;
						return;
					}
				});
			});
		}

		if (parameters != null)
		{
			this.#viewer.report.dictionary.variables.list.forEach(function(variable)
			{
				parameters.forEach(function(parameter)
				{
					if (variable.name == parameter.name)
					{
						variable.valueObject = parameter.value;
						return;
					}
				});
			});
		}

		if (data != null)
		{
			var dataSet = new Stimulsoft.System.Data.DataSet("DataSet");
			dataSet.readJson(data);
			this.#viewer.report.regData(dataSet.dataSetName, "", dataSet);
			this.#viewer.report.dictionary.synchronize();
		}
	}

	designReportDefinition(definition)
	{
		var report = new Stimulsoft.Report.StiReport();
		report.load(definition);
		this.#designer.report = report;
	}

	designReportFile(file)
	{
		var report = new Stimulsoft.Report.StiReport();
		report.loadFile(file);
		this.#designer.report = report;
	}
}
