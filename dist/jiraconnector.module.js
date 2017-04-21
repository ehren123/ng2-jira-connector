"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var jiraconnector_service_1 = require("./jiraconnector.service");
var JiraconnectorModule = (function () {
    function JiraconnectorModule() {
    }
    return JiraconnectorModule;
}());
JiraconnectorModule.decorators = [
    { type: core_1.NgModule, args: [{
                declarations: [],
                imports: [
                    platform_browser_1.BrowserModule,
                    http_1.HttpModule
                ],
                providers: [
                    jiraconnector_service_1.JiraconnectorService,
                    { provide: jiraconnector_service_1.JIRA_URL, useValue: 'https://jira.foo.bar/rest/api/2/' },
                ],
                bootstrap: []
            },] },
];
/** @nocollapse */
JiraconnectorModule.ctorParameters = function () { return []; };
exports.JiraconnectorModule = JiraconnectorModule;
//# sourceMappingURL=jiraconnector.module.js.map