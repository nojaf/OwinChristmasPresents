module ChristmasPresents {

    export class PresentService {

        static PeopleLocalStorageKey: string = "people";
        static serviceId: string = "presentFactory";

        constructor(private $http:ng.IHttpService, private $q:ng.IQService) {

        }

        public loadPeople():server.Person[] {
            if (localStorage) {
                var json: string = localStorage.getItem(PresentService.PeopleLocalStorageKey);

                if (!json) return [];

                var poules: server.Person[] = angular.fromJson(json);
                console.log("Found people in localStorage", poules);
                return poules;
            }

            return [];
        }

        public savePeople(people: server.Person[]) {
            if (localStorage) {
                var json: string = angular.toJson(people);
                localStorage.setItem(PresentService.PeopleLocalStorageKey, json);
            }
        }

        public randomizePeople(people: server.Person[]):ng.IPromise<server.Person[]> {
            var request: ng.IRequestConfig = {
                method: "POST",
                data: people,
                url: "/api/present/randomize"
            };

            var deferred: ng.IDeferred<server.Person[]> = this.$q.defer<server.Person[]>();

            this.$http<server.Person[]>(request).success(data => deferred.resolve(data)).error(err => deferred.reject(err));

            return deferred.promise;
        }
    }

    getAngularModule().factory(PresentService.serviceId,
        ["$http", "$q", ($http: ng.IHttpService, $q: ng.IQService) => {
            return new PresentService($http, $q);
        }]);
}