// An action is a plain object that represents an intention to change the state.
//
// An action creator is, quite simply, a function that creates an action.
//
// Calling an action creator only produces an action, but does not dispatch it.
// You need to call the store's dispatch function to actually cause the mutation.
// Sometimes we say bound action creators to mean functions that call an action creator
 // and immediately dispatch its result to a specific store instance.
//
// If an action creator needs to read the current state, perform an API call,
// or cause a side effect, like a routing transition, it should return an
// async action instead of an action.
//
// An async action is a value that is sent to a dispatching function,
// but is not yet ready for consumption by the reducer. It will be transformed
// by middleware into an action (or a series of actions) before being sent to the
// base dispatch() function. Async actions may have different types, depending on the
// middleware you use. They are often asynchronous primitives, like a Promise or a thunk,
// which are not passed to the reducer immediately, but trigger action dispatches once
// an operation has completed.

import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants'

export const createReminder__ActionCreator = (text, dueDate) => {
  const action = {
    type: ADD_REMINDER,
    text,
    dueDate
  }

  return action
}

export const deleteReminder__ActionCreator = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id
  }

  return action
}

export const clearReminders__ActionCreator = () => {
  const action = {
    type: CLEAR_REMINDERS,
  }

  return action
}
