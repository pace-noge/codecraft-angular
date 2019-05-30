import { Component, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


class Joke {
	setup: string;
	punchline: string;
	hide: boolean;

	constructor(setup: string, punchline: string) {
		this.setup = setup;
		this.punchline = punchline;
		this.hide = true
	}

	toggle() {
		this.hide = !this.hide;
	}
}


@Component({
	selector: 'joke',
	template: `
			<div class="card">
			<div class="card-body">
				<h4 class="card-title">{{ data.setup }}</h4>
				<p class="card-text" [hidden]="data.hide">{{ data.punchline }}</p>
				<button class="btn btn-primary" (click)="data.toggle()">Tell Me</button>
			</div>
		</div>
	`
})
class JokeComponent {
	@Input() data: Joke;
}


@Component({
	selector: 'joke-form',
	template: `
		<div class="card">
			<h4 class="card-title">Create Joke</h4>
			<div class="card-body">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="enter the setup" #setup>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Enter the punchline" #punchline>
			</div>
			<div class="form-group">
			<button class="btn btn-primary" (click)="createJoke(setup.value, punchline.value)">Create</button>
			</div>
			</div>
		</div>
	`
})
class JokeFormComponent {
	@Output() jokeCreated = new EventEmitter<Joke>();

	createJoke(setup: string, punchline: string) {
		this.jokeCreated.emit(new Joke(setup, punchline));
	}
}



@Component({
	selector: 'joke-list',
	template: `
		<joke-form (jokeCreated)="addJoke($event)"></joke-form>
		<joke *ngFor="let j of jokes" [data]="j"></joke>
	`
})
class JokeListComponent {
	jokes: Joke[];


	constructor() {
		this.jokes = [
			new Joke("What did cheese say when it looked in the mirror?", "Hello-Me (halloume)"),
			new Joke("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
			new Joke("A kid threw a lump of cheddar at me", "I thought 'That's not very mature'"),
		]
	}

	addJoke(joke) {
		this.jokes.unshift(joke);
	}

}


@Component({
	selector: 'app',
	template: `
		<joke-list></joke-list>
	`
})
class AppComponent {
}


@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, JokeFormComponent, JokeListComponent, JokeComponent],
	bootstrap: [AppComponent]
})
class AppModule{

}


platformBrowserDynamic().bootstrapModule(AppModule);
