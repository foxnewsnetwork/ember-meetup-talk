# Talk Transcript

Here is a rough outline of my talk.

## Outline / transcript
- Introduce the problem of state
  - preamble
    * let's talk about state. (!slide with bad code) states and managing states in your code is always bad, and seems to consistently lead to (!slide with Hickley), as Rich Hickly puts it, "complecting" your application until you inevitably reach the (!slide with meme matrix) 'technological debt singularity' where every one change or fix to the code-base causes your app to break in two or more other places - (!slide with hydra)
    * Add to that indeterministic async IO that drives these changes and you literally have the perfect formula for 21st pain and suffering. (!slide with scene from shining) I don't know about you, but my body is definitely not ready for that.

  - ‘If’, ‘set’, and ‘observe’ creates black magic code
    * (!slide with home depot + tomster) so while ember.js is an awesome power tool for building ambitious application, (!slide with guy huffing paint, nailing foot, etc.) the very same tools it provides us can also just as quickly turn against us.
    * (!slide with if-statement code) Consider the following innocent code snippet that mutates a controller state on an action
    * (!slide with clock) over time, given the natural tendency of code entropy, it might evolve to this (!slide with worse code)
    * (!slide with bus hitting developer) and suppose your tech lead happens to be on vacation when (!slide with deadline) some deadline or critical bug hits and some filthy (!slide with pointer at presenter) casual dev like me forces a commit like this in to solve our pressing issue (!slide with worst code of all)
    * then things go back to normal... except now there's awful code in our code repo that only this guy (!slide with arrow again) knows how to work with - which means everyone now has to work around and on top of my trash, and bam, we now have in our app the only thing worse than broken code - cancerous code that works.
    * Which, by the way, is like: (!slide with girl) it's like beginning an okcupid relationship on a lie; (!slide with catfish man) I pretend I'm a wealthy 6'3" millionaire of Angelo-Saxon descent with a passion for purses and shoes. And she pretends she's actually a woman (!slide with obvious serial killer in a wig)

  - Objects can’t properly encapsulate because `_privateDontTouch` will still be touched if things get desperate (what’s worse than broken code? Bad code that works)
    * (!slide with private variable named `_privateDontTouch`) the fact of the matter is, if state is living everywhere and can be modified anywhere - (!slide with javascript) which it can because javascript is the peeping tom of languages, (!slide with resistance horse with NSFW text cropped out) so saying "no, don't look here and don't touch there" does nothing - it will inevitably get modified and entangled everywhere.

- Sell the redux solution
  - preamble
    * So what can we do? (!slide with haskell, monads, applicatives) I'm just kidding, we're not going to use haskell to write javascript.
    * (!slide with redux) But the good folks at facebook did come up with a reasonably good solution with redux which has already been shimmed twice into ember.js with `ember-redux` by toranb and `ember-cli-redux` by altschools
    * So what is redux? the TL;DR of it is that it is a...
  - God state pojo
    * (!slide with a big pojo) is god pojo that presents the entire mutable state of your app
  - Stateless transforms
    * (!slide with reducers and that redux gif) and your app changes state via a pub-sub mechanism to call 'reducers' functions that consume the current state and a pojo of instructions regarding how to return a new state
  - Why?!
    * (!slide with the 3 koma meme of the business men who look at propositions and are unimpressed at first, but excited at the last frame despite minor unimpressive changes) So if you haven't worked with redux before, you're probably thinking right now "this is 2016, and you're trying to throw battle-tested Object-Oriented out the window and sell me on pub-sub? C'mon facebook-shill, if there was an 'unlike' button for this talk, I'd press it right now."
    * (!slide with java, c++) And that's true, for a good number of us who hail from more traditional language backgrounds, the so-called "functional" way of thinking is a hard sell... but we must also take in the fact javascript does not support true traditional OO - notably if business pressure to ship gets high enough, no variable is private enough, and no side effect is unintuitive enough to keep the desperate programmer from doing what he or she must. (!slide with desperate times for desperate measures) desperate times call for desperate measures.
    * Unfortunately, a true cohesive argument for a functional pure approach to programming is well beyond the scope of my humble talk, (!slide with decaprio in inception) but I do ask that we take a leap of faith and trust in the giants of our industry that redux is good paradigm and can and should work within ember.
    *  (!slide with facebook) besides, what's the worst thing that can happen when you trust your internal information to this corporation.
  - Delegate v. dumb components
    * (!slide with code) So let's say we install ember-redux and start writing redux-flavored ember code. We'll skip the 'Hello World' example, and instead go into something more interesting. Let's say we're building an internet streaming service that provides specialty movies and videos.
    * (!slide with gnatflix router.js) Our router.js file will have a `movies` index route where the user can browse the catalog of gnat movies our services offers, a `movies/:movie_id` route where the user can view in more detail things such as a rough summary of the movie and perhaps its rating and screenshots, and a `admin/movies/:movie_id/edit` route where an employee can edit the status of movie and possibly remove it from the catalog in the event we suddenly lose the license to it. Very standard ember stuff, with ember-data we would just do `this.store.findAll('movie')` in the movies index route and `this.store.findRecord('movie', id)` in the movie show and admin edit route and be done with that... but how would be do it in vanilla ember-redux
    * (!slide with movies-index-container and friends code) ember-redux (and also actually ember-routable-components if it ever lands) recommends writing a sort of 'async-delegate-component' to handle the `$.ajax` call that will fetch from the back-end server our data, so that once the remote data resolves, it can be presented to the user via `dumb-presentational-components` 
    * (!slide with more code) you'll notice this way, we leave our `model` hook in our routes blank, and flat-out don't write controllers. And instead, we've now delegated the remote logic to our `movies-index-container` component.
    * (!slide with the admin edit route) and if our admins are going to be making stateful changes to the movies (such as removing them from the catalog), we'd write an action handler that dispatches to our redux reducers to handle mutating the object value since we won't be able to use ember's `mut` helpers in the templates anymore

- Highlight the problems of using ember-redux out of the box
  - preamble
    * (!slide with meme) sounds good? (!slide with more meme) I wouldn't say so.
  - Boilerplate with components like ‘route-dog-edit-container’ and boilerplate actions because no mut helper
    * (!slide with boilerplate) The problem is that we've gotten rid of a lot of extremely well-tested, tried, and battle-tested ember utilities and conventions that actually made building ambitious apps in ember doable and enjoyable, and replaced it with a ton of error-prone boilerplate javascript code that has objectively made our app more brittle
    * (!slide with desparate developer) because it exposed more surface area for an unruly developer to come in and mess up. 
    * (!slide with loading and error hbs files) Furthermore, we've lost the `error` and `loading` routes that we used to get for free, and in their place introduced a ton of our own 'container' route components that differ from each other only by (!slide with routeNames) their routeNames, (!slide with queryParams) can't access queryParams, (!slide with service:-routing) can't affect transitions, (!slide with yield) and can't control their own outlets beyond yield and yield to=inverse... 
  - Async acceptance test helpers like ‘andThen’ are broken
    * (!slide with tests) On top of that, all your acceptance tests are now broken because all your async test helpers like `andThen` will now instantly resolve. 
  - No isolated IO layer means $.ajax, window.fetch, and friends in your components
    * (!slide with $) and on top of that, we've peppered these infernal I/O dollar signs eveywhere and completely lost the ability to customzie our adapters, serializers, and transforms, coalesce find requests, configure api endpoints, and all that jazz with our data layer.
    * (!slide with data layer) actually, we've lost all our data layer, so if you had fancy ideas of perhaps retrying certain request across mulitiple endpoints or switching your backend from firebase.io to your own elixir-phoenix server as your small business scales, you can either kiss all that goodbye, or enjoy slogging through the most creative and clever complexed code your newly hired intern wrote up for you when it inevitably breaks.
  - Ember-routeable-components is up in the air, so writing code is always dangerous
    * (!slide with routable components, module unification) and realistically, less code you've written for your app, the more easily you can future-proof yourself against the new ember features / rfcs like routable components, module unifcation, and whatnot.
    * (!slide with bloated project) but when these new changes start coming to pass in ember 2.9+ or ember 3.x or whenever, there is almost no way in hell you'd be able to ride onto the latest ember if your app is burdered down with 300+ files and folders of boilerplate your team has written.
  - post-amble
    * (!slide with baby being grounded up) sure we're "cleaner" and more "pure" now, but in the process, we've just throw the baby, the sink, and much of the kitchen out with the bathwater, and then made sure no new kitchen can be built in their place.
- Present the ember-with-redux solution
  - preamble
    * So what do we do? (!slide with having and eating cake) We want both the transparent and clean state management solution of redux at the same time we refuse to give up any of our cherished ember traditions. Can we have our cake and eat it too? Fortunately the answer is yes. If we keep ember-data at the I/O boundaries of our app, manage state with ember-redux, and slightly extend some of ember and ember-data's api, we can have the best of both worlds. (!slide with ember-with-redux repo) and that's exactly what the ember-with-redux addon strives to do for you.

  - Show some example code
    - model files
      * (!slide with model file) with this addon, we declare our DS.Model files exactly as we have been doing
    - findRecord route
      * (!slide with findRecord route) and when you go to find the record in your run-of-the-mill findRecord route, this addon automatically figures out if your remote model has resolved or rejected and syncs that state with the redux state storage under the `ds` namespace. 
      * (!slide with template.hbs file) so that in your templates, you can directly access the resolved route model under the `data` and `meta` reference names. (!slide with meta and data type) Under the hood, meta and data are stored in an Immutable.Map object called the `routeModel` that is a computed property that getState() from redux based upon the current route. Meta is a POJO containing the { modelName, id } and other such meta data of your resolved routeModel while `data` is a flat POJO containing the values exactly as you declared in your model file. 
    - editRecord route
      * (!slide with edit route) this addon introduces 2 additional methods to the DS.Store called `checkoutChangeset` and `persistChangeset` which, if you're familiar with DockYard's ember-changeset addons, present a way to both modify existing and create new DS.Models atomically and without side-effect (i.e. we now no longer have to hook into a route's deactivate method to check if the controller model is dirty to decide if we want to clean it up or not).
      * (!slide with edit template file) the checkoutChangeset creates a changeset which we can access via the `changeset` and `changes` key in the template file. This addon also introduces 2 new helpers `ds-mut-action` and `ds-persist-action` which work with changesets in much the same way `mut` does with regular ember objects. They are template shorthands for (!slide with ds-mut-action short hand) and (!slide with ds-persist-action short hand)
      * notice that persist action returns a function (in this particular case in redux, it's called a thunk) which we dispatch over to the redux reducers for handling. (!slide with transition after persist) If we wished to do other stuff like effect transitions after the persist has completed, we'd have to pipe this function into our persisting one
    - queryRecord route
      * (!slide with index route) next, in index findAll or query routes, this addon extends the query function to now take one additional argument after the server-side search params that is the local map/filter/reduce/sort function which redux will use to locally determine membership to the final returned list
      * (!slide with template.hbs) similarly, we access the list of returned data via the `list` reference in the template files
      * (!slide with free stuff) bear in the mind the query params is sent up to some remote upstream for data-querying that is entirely out of our hands, while the function (called a transducer by rich hickley) we pass in processes it afterwards. This way, any additional models pushed into our app state by either remote server push notifications, sockets, or what have you, automatically updates the index list, and thereby giving us live-updating to queried lists for free (which, incidentally, is currently not possible with vanilla ember-data)
    - route model and params
      * (!slide with util functions) finally, it's directly possible to access the route model and route params in the template as well as from redux state with these util functions; I won't go into them now, but they pretty much all do what their names suggest they do
  - Hand wave the store, route, and controller extensions
    * so how is all this done?
    * (!slide with reducer) well, this addon ships with a big reducer that tracks down and names most of the notable state changes in ember and ember-data
    * (!slide with the extensions) and we then extend the DS.Store, Ember.Route, and Ember.Controller files to properly register their states with redux as well as pull their computed properties from redux.getState()
    * (!slide with route and controller) A point of contention is why we extend route and controller instead of figure out some way to have ember automatically scaffold some container component. And it's because ember's route+controller combo serves *exactly* as the top-level container component; and as shakespeare says "a rose by any other name would still smell as sweet", well route+controller just happens to be what we call our "top-level container" component here in ember.
  - Recap
    * (!slide with recap) So to recap:
    * use ember-redux and ember-data
    * keep all your state transition code in reducer functions
    * keep the rest of your app (e.g. components, routes, controllers, etc.) dumb as rocks
    * keep all your async I/O code in your adapter files

