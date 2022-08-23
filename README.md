# CompositeFlows

## How the code is organised

### Top level

- **index.html** - index html page
- **index.ts** - typescript file that kicks it all off
- **Create Hyper Project commands.txt** – how to set up a HyperApp project
- **HyperAppEdited.js** – HyperApp index.js file edited to include an onEnd event callback

### src

- **src/definitions** – typescript definition
- **src/modules** – author modules

### src/modules

- **src/modules/behaviours** – wizard behaviour - controls wizard navigation etc
- **src/modules/components** – what the user interacts with
- **src/modules/global** – global code
- **src/modules/images** – raw icons
- **src/modules/interfaces** – all state objects and wizard behaviours rely on interfaces
- **src/modules/state** – all the objects that hold data
- **src/modules/subscriptions** – subscriptions are HyperApp concept - regular jobs

### settings

- **src/modules/state/user/Settings** - set the urls etc. here

### src/modules/components

- **src/modules/components/background** – draws the background
- **src/modules/components/core** – controls the whole window – whether trees, branches etc
- **src/modules/components/displays** – left handside of the browser window
- **src/modules/components/header** – the left handside’s header
- **src/modules/components/init** – the initiating component – reads the url, creates the first state
- **src/modules/components/lenses** – right handside of the browser window – the editable views
- **src/modules/components/lightbox** – the lightbox view – errors, confirmation dialogue etc
- **src/modules/components/menu** – the main menu that sits above the lens
- **src/modules/components/pagination** – for navigating pages of results
  - _Each should have 5 sub-folders_
    - _actions_
    - _code_
    - _effects_
    - _scss_
      - _SASS for the component_
    - _views_
      - _interpret the state and tell hyperApp what html to draw_
      - _only hold code is for interpreting state not changing it_
      - _plug hyperApp actions into html element events to react to browser events_

### src/modules/components/lenses/lens

- base lens – understands tabs etc

### src/modules/components/lenses/tabs

- **src/modules/components/lenses/tabs/altsLens** – tab for editing alternative phrasing for discussions
- **src/modules/components/lenses/tabs/filterLens** – tab for filtering trees
- **src/modules/components/lenses/tabs/historyLens** – tab for viewing edit history for a tree
- **src/modules/components/lenses/tabs/nodeLens** – tab for editing branch nodes
- **src/modules/components/lenses/tabs/notificationLens** – tab for viewing notifications
- **src/modules/components/lenses/tabs/searchLens** – for searches in own tab and wizards
- **src/modules/components/lenses/tabs/settingsLens** – tab for editing user settings
- **src/modules/components/lenses/tabs/shapeLens** – tab for viewing which subtrees a tree depends on
- **src/modules/components/lenses/tabs/spreadLens** – tab for viewing where a subtree has been referenced
- **src/modules/components/lenses/tabs/tagsLens** – tab for editing tree classifications
- **src/modules/components/lenses/tabs/treeLens** – tab for editing trees and subtrees
- **src/modules/components/lenses/tabs/validationLens** – tab for viewing tree validation results
- **src/modules/components/lenses/tabs/viewSettingsLens** – tab for controlling the saved user views
  - _unlike other components lenses share views – to assemble wizards_

### src/modules/components/lenses/tabs/nodeLens

- **src/modules/components/lenses/nodeLens/views/branchToSubtree** – wizard for converting a branch to subtree
- **src/modules/components/lenses/tabs/nodeLen/viewss/cloneBranch** – wizard for cloning a branch
- **src/modules/components/lenses/tabs/nodeLens/views/common** – shared branchTask wizard views
- **src/modules/components/lenses/tabs/nodeLens/views/hole** – wizards for mapping a hole to a socket
- **src/modules/components/lenses/tabs/nodeLens/views/moveBranch** – wizard for moving a branch
- **src/modules/components/lenses/tabs/nodeLens/views/node** – wizards for editing a simple node
- **src/modules/components/lenses/tabs/nodeLens/views/stashBranch** – wizards for stashing a branch
- **src/modules/components/lenses/tabs/nodeLens/views/subtree** – wizards for referencing subtrees in nodes

### src/modules/components/lenses/tabs/treeLens

- **src/modules/components/lenses/tabs/treeLens/views/bot** – wizards for bots – none built yet
- **src/modules/components/lenses/tabs/treeLens/views/subtree** – wizards for creating and editing subtrees
- **src/modules/components/lenses/tabs/treeLens/views/tree** – wizards creating and editing trees

### src/modules/global

- **src/modules/global/actions** - actions are hyperApp events for changing state
  - _they are mini-engines that combined drive the author_
  - _first param is always the state object_
  - _return either the state object, or array with state object as first element_
  - _returning a shallow cloned object will cause a redraw_
  - _conversely returning the same state object will prevent a re-draw_
- **src/modules/global/code** – global code
  - _general shared code that is neither an action nor effect_
- **src/modules/global/effects** - effects are hyperApp callbacks
  - _returned from actions as second element in array_
  - _used for loading data async from the database etc_
  
## Following the execution order

The code starts with the index.ts:

```js
initEvents.registerGlobalEvents();

app({
    node: document.getElementById("treeSolveAuthor"),
    init: initState.initialise,
    view: initView.buildView,
    subscriptions: initSubscriptions,
    onEnd: initEvents.onRenderFinished
})
```

First it registers event listeners.
The render finished event is hack of the hyperApp _index.js_ file so we can calculate heights, background settings etc, of elements. This can only be done after the elements exist.

Next it registers the hyperApp code setting the properties to delegates

- **initState.initialise** - runs the initialise code for setting up state etc
- **initView.buildView** - is the entry method for building views, it is called at the beginning of each paint
- **initSubscriptions** - for registering jobs to run at the end of each paint
- **onEnd** - is the callback added at the end of the hyperApp render method

Drill down from `initView.buildView` and you will see it does not follow the recommended practices, rather it hands over successive layers of view hierarchy to determine which components to draw, based on the current properties of the global _state_ object.

In the _views_, _actions_ are linked to html element events, hyperApp takes control of how to call those _actions_. The _actions_ respond by setting properties on the global _state_. If the global _state_ wrapper changes, hyperApp calls the `initView.buildView` again, causing a re-paint. Use this to control re-drawing.
If _state_ is not returned at the end of an _action_ the whole app collapses.

If you need to get data from the database use _effects_, then instead of returning a _state_ object from an _action_ return an array where the first element is the _state_ object and the second the _effect_. HyperApp will take care of calling the ajax and the eventual callback with the returned object. This is passed to a _action_ delegate registered with the _effect_. Here you can handle loading the data into the relevant _state_ objects. Returning the _state_ in a fresh wrapper then causes a redraw.

The _author_ has a series of recurring jobs where you can register  _effects_ to run either immediately or on the next loop.
This is how the trees view is updated after saving an edited tree.

So to recap with hyperApp there are only 3 tasks:

- build views in response to the state they are fed
- build actions that respond to events in the browser by changing the state
- build effects that load or send state to the server

It is very simple and clean.
