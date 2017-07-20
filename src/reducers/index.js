// A reducer (also called a reducing function) is a function that accepts
// an accumulation and a value and returns a new accumulation.
// They are used to reduce a collection of values down to a single value.
//
// Reducers calculate a new state given the previous state and an action
//
// In Redux, the accumulated value is the state object, and the values being
// accumulated are actions. Reducers calculate a new state given the previous
// state and an action. They must be pure functions—functions that return
// the exact same output for given inputs. They should also be free of side-effects.
// This is what enables exciting features like hot reloading and time travel.

import {ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from '../constants'
import {bake_cookie, read_cookie} from 'sfcookies'

const newReminder = (action) => {
  let {text, dueDate} = action

  return {
    id: Math.random(),
    text,
    dueDate
  }
}

const remindersReducer = (state__reminders = [], action) => {
  let reminders = null;
  state__reminders = read_cookie('reminders')

  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state__reminders, newReminder(action)]
      bake_cookie('reminders', reminders)
      return reminders
    case DELETE_REMINDER:
      reminders = state__reminders.filter( (reminder) => reminder.id !== action.id )
      bake_cookie('reminders', reminders)
      return reminders
    case CLEAR_REMINDERS:
      reminders = []
      bake_cookie('reminders', reminders)
      return reminders
    default:
      return state__reminders
  }
}

export default remindersReducer
