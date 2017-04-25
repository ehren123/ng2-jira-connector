"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/toPromise");
exports.JIRA_URL = new core_1.InjectionToken('JiraUrl');
var JiraconnectorService = (function () {
    function JiraconnectorService(_http, jiraUrl) {
        this._http = _http;
        this.jiraUrl = jiraUrl;
        this.headers = new http_1.Headers({ 'Content-type': 'application/json' });
    }
    JiraconnectorService.prototype.setBasicAuthorization = function (username, password) {
        this.headers.append('Authorization', 'Basic ' + window.btoa(username + ":" + password));
    };
    JiraconnectorService.prototype.createComment = function (issueId, comment) {
        return this._post(this.jiraUrl + "issue/" + issueId + "/comment", JSON.stringify({ body: comment }));
    };
    JiraconnectorService.prototype.createIssue = function (fields) {
        if (fields.customfields) {
            this.mapCustomfields(fields);
        }
        return this._post(this.jiraUrl + "issue", JSON.stringify({ fields: fields }));
    };
    JiraconnectorService.prototype.editIssue = function (issueId, fields) {
        if (fields.customfields) {
            this.mapCustomfields(fields);
        }
        return this._put(this.jiraUrl + "issue/" + issueId, JSON.stringify({ fields: fields }));
    };
    JiraconnectorService.prototype.getIssue = function (issueId) {
        return this._get(this.jiraUrl + "issue/" + issueId);
    };
    JiraconnectorService.prototype.searchIssues = function (jqlString) {
        return this._post(this.jiraUrl + "search", { jql: jqlString });
    };
    JiraconnectorService.prototype.mapCustomfields = function (fields) {
        for (var key in fields.customfields) {
            fields[key] = fields.customfields[key];
        }
        fields.customfields = null;
    };
    JiraconnectorService.prototype.handleError = function (error) {
        return rxjs_1.Observable.throw(error.message || error);
    };
    JiraconnectorService.prototype._get = function (url) {
        var _this = this;
        return this._http.get(url, { withCredentials: true })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(error); });
    };
    JiraconnectorService.prototype._post = function (url, body) {
        var _this = this;
        return this._http.post(url, body, { headers: this.headers, withCredentials: true })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(error); });
    };
    JiraconnectorService.prototype._put = function (url, body) {
        var _this = this;
        return this._http.put(url, body, { headers: this.headers, withCredentials: true })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return _this.handleError(error); });
    };
    return JiraconnectorService;
}());
JiraconnectorService.decorators = [
    { type: core_1.Injectable },
];
/** @nocollapse */
JiraconnectorService.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.JIRA_URL,] },] },
]; };
exports.JiraconnectorService = JiraconnectorService;
//# sourceMappingURL=jiraconnector.service.js.map