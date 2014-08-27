/// <reference path="Person.cs.d.ts" />

declare module server {
	interface Poule {
		name: string;
		people: server.Person[];
	}
}
