/// <reference path="../typings/angular-translate/angular-translate.d.ts" />
var ChristmasPresents;
(function (ChristmasPresents) {
    angular.module("christmas", ['pascalprecht.translate']).config(["$translateProvider", translate]);

    function getAngularModule() {
        return angular.module("christmas");
    }
    ChristmasPresents.getAngularModule = getAngularModule;

    function translate($translateProvider) {
        console.log($translateProvider);

        $translateProvider.useStaticFilesLoader({
            prefix: "/translations/",
            suffix: ".json"
        });

        var path = window.location.href.substr(window.location.href.length - 2, 2) || "en";
        if (path !== "en" && path !== "nl")
            path = "en";

        $translateProvider.preferredLanguage(path);
    }
})(ChristmasPresents || (ChristmasPresents = {}));
//# sourceMappingURL=app.js.map
