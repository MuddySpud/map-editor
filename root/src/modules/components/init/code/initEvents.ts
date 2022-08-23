import lensOnRenderFinished from "../../lenses/lens/code/lensOnRenderFinished";
import branchesDisplayOnRenderFinished from "../../core/branchesCore/code/branchesCoreOnRenderFinished";
import treesCoreOnRenderFinished from "../../core/treesCore/code/treesCoreOnRenderFinished";
import lightBoxOnRenderFinished from "../../lightBox/code/lightBoxOnRenderFinished";
import warningOnRenderFinished from "../../warning/code/warningOnRenderFinished";


const initEvents = {

    onRenderFinished: () => {

        lensOnRenderFinished();
        treesCoreOnRenderFinished();
        branchesDisplayOnRenderFinished();
        warningOnRenderFinished();
        lightBoxOnRenderFinished();
        window.TreeSolve.discussionPlugins.pluginsOnRenderFinished();
    },

    registerGlobalEvents: () => {

        window.onresize = () => {
            initEvents.onRenderFinished();
        };
    }
}

export default initEvents;



/*

// IMPLEMENT onEnd callback
// Change node_modules/hyperapp-local/src/index.js to this
// Add a new callback param and call it after the render method completes
// This will need to be done after each update of hyperapp-local!!!!!!!!!!!!!!
// App.render is normally called twice.

export var app = function(props) {
  var state = {}
  var lock = false
  var view = props.view
  var node = props.node
  var vdom = node && recycleNode(node)
  var subscriptions = props.subscriptions
  var subs = []
  var onEnd = props.onEnd //........................... <=== create callback variable, set to new param property
  var count = 1

  var listener = function(event) {
    dispatch(this.actions[event.type], event)
  }

  var setState = function(newState) {
    if (state !== newState) {
      state = newState
      if (subscriptions) {
        subs = patchSubs(subs, batch([subscriptions(state)]), dispatch)
      }
      if (view && !lock) defer(render, (lock = true))
    }
    return state
  }

  var dispatch = (props.middleware ||
    function(obj) {
      return obj
    })(function(action, props) {
    return typeof action === "function"
      ? dispatch(action(state, props))
      : isArray(action)
      ? typeof action[0] === "function"
        ? dispatch(
            action[0],
            typeof action[1] === "function" ? action[1](props) : action[1]
          )
        : (batch(action.slice(1)).map(function(fx) {
            fx && fx[0](dispatch, fx[1])
          }, setState(action[0])),
          state)
      : setState(action)
  })

  var render = function() {
    lock = false
    node = patch(
      node.parentNode,
      node,
      vdom,
      (vdom = getTextVNode(view(state))),
      listener
    )
    onEnd() //........................... <=== Call new callback after the render method finishes
  }

  dispatch(props.init)
}



*/