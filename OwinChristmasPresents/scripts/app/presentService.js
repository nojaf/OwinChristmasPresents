var ChristmasPresents;
(function (ChristmasPresents) {
    var PresentService = (function () {
        function PresentService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        PresentService.prototype.loadPeople = function () {
            if (localStorage) {
                var json = localStorage.getItem(PresentService.PeopleLocalStorageKey);

                if (!json)
                    return [];

                var poules = angular.fromJson(json);
                console.log("Found people in localStorage", poules);
                return poules;
            }

            return [];
        };

        PresentService.prototype.savePeople = function (people) {
            if (localStorage) {
                var json = angular.toJson(people);
                localStorage.setItem(PresentService.PeopleLocalStorageKey, json);
            }
        };

        PresentService.prototype.randomizePeople = function (people) {
            var request = {
                method: "POST",
                data: people,
                url: "/api/present/randomize"
            };

            var deferred = this.$q.defer();

            this.$http(request).success(function (data) {
                return deferred.resolve(data);
            }).error(function (err) {
                return deferred.reject(err);
            });

            return deferred.promise;
        };
        PresentService.PeopleLocalStorageKey = "people";
        PresentService.serviceId = "presentFactory";
        return PresentService;
    })();
    ChristmasPresents.PresentService = PresentService;

    ChristmasPresents.getAngularModule().factory(PresentService.serviceId, [
        "$http", "$q", function ($http, $q) {
            return new PresentService($http, $q);
        }]);
})(ChristmasPresents || (ChristmasPresents = {}));
//# sourceMappingURL=presentService.js.map
