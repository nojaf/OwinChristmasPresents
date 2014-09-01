var ChristmasPresents;
(function (ChristmasPresents) {
    var MainController = (function () {
        function MainController($scope, presentService, $translateProvider) {
            var _this = this;
            this.$scope = $scope;
            this.presentService = presentService;
            this.$translateProvider = $translateProvider;
            this.$scope.removePerson = function (index) {
                return _this.removePerson(index);
            };
            this.$scope.addPerson = function (name) {
                return _this.addPerson(name);
            };
            this.$scope.submit = function () {
                return _this.submit();
            };
            this.$scope.people = presentService.loadPeople();
            this.$scope.changeLanguage = function (lang) {
                return _this.changeLanguage(lang);
            };
        }
        MainController.prototype.addPerson = function (name) {
            this.$scope.people.push({ Name: name });
            this.savePoules();
            this.$scope.personName = null;
            this.$scope.results = null;
        };

        MainController.prototype.removePerson = function (index) {
            this.$scope.people.splice(index, 1);
            this.$scope.results = null;
            this.savePoules();
        };

        MainController.prototype.savePoules = function () {
            this.presentService.savePeople(this.$scope.people);
        };

        MainController.prototype.submit = function () {
            var _this = this;
            this.$scope.error = false;

            this.presentService.randomizePeople(this.$scope.people).then(function (data) {
                console.log("result", data);
                _this.$scope.results = data;
            }).catch(function (err) {
                _this.$scope.error = true;
            });
        };

        MainController.prototype.changeLanguage = function (language) {
            this.$translateProvider.use(language);
        };
        MainController.serviceId = "mainCtrl";
        return MainController;
    })();
    ChristmasPresents.MainController = MainController;

    ChristmasPresents.getAngularModule().controller(MainController.serviceId, [
        "$scope", ChristmasPresents.PresentService.serviceId, "$translate", function ($scope, presentService, $translateProvider) {
            return new MainController($scope, presentService, $translateProvider);
        }]);
})(ChristmasPresents || (ChristmasPresents = {}));
//# sourceMappingURL=mainCtrl.js.map
