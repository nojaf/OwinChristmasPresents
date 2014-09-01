module ChristmasPresents {
    export interface IMainControllerScope extends ng.IScope {
        people: server.Person[];
        results: server.Person[];
        addPerson: (name: string) => void;
        removePerson: (index: number) => void;
        personName: string;
        submit: () => void;
        error: boolean;
        changeLanguage: (lang: string) => void;
    }

    export class MainController {
        static serviceId: string = "mainCtrl";

        constructor(public $scope: IMainControllerScope, public presentService: PresentService,
            public $translateProvider: ng.translate.ITranslateProvider) {

            this.$scope.removePerson = (index: number) => this.removePerson(index);
            this.$scope.addPerson = (name: string) => this.addPerson(name);
            this.$scope.submit = () => this.submit();
            this.$scope.people = presentService.loadPeople();
            this.$scope.changeLanguage = (lang: string) => this.changeLanguage(lang);
        }

        public addPerson(name: string): void {
            this.$scope.people.push({ Name: name });
            this.savePoules();
            this.$scope.personName = null;
            this.$scope.results = null;
        }

        public removePerson(index: number): void {
            this.$scope.people.splice(index, 1);
            this.$scope.results = null;
            this.savePoules();
        }

        private savePoules() {
            this.presentService.savePeople(this.$scope.people);
        }

        public submit(): void {
            this.$scope.error = false;

            this.presentService.randomizePeople(this.$scope.people)
                .then(data => {
                    console.log("result", data);
                    this.$scope.results = data;
                }).catch(err => {
                    this.$scope.error = true;
                });

        }

        private changeLanguage(language: string) {
            this.$translateProvider.use(language);
        }
    }

    getAngularModule().controller(MainController.serviceId,
        ["$scope", PresentService.serviceId, "$translate", ($scope: IMainControllerScope,
            presentService: PresentService, $translateProvider: ng.translate.ITranslateProvider) => {
            return new MainController($scope, presentService, $translateProvider);
        }]);
} 