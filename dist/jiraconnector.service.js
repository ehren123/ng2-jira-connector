"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
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
        var _this = this;
        return this._http.post(this.jiraUrl + 'issue/' + issueId + '/comment', JSON.stringify({ body: comment }), { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) { return _this._handleError(error); });
    };
    JiraconnectorService.prototype.createIssue = function (fields) {
        var _this = this;
        return this._http.post(this.jiraUrl + 'issue', JSON.stringify({ fields: fields }), { headers: this.headers, withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) { return _this._handleError(error); });
    };
    JiraconnectorService.prototype.getIssue = function (issueId) {
        var _this = this;
        return this._http.get(this.jiraUrl + 'issue/' + issueId, { withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) { return _this._handleError(error); });
    };
    JiraconnectorService.prototype.searchIssues = function (jqlString) {
        var _this = this;
        return this._http.post(this.jiraUrl + 'search', { jql: jqlString }, { withCredentials: true })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(function (error) { return _this._handleError(error); });
    };
    JiraconnectorService.prototype._handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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