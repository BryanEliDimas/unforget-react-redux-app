import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { createReminder__ActionCreator,
         deleteReminder__ActionCreator,
         clearReminders__ActionCreator
       } from '../actions'

import moment from 'moment'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      dueDate: ''
    }
  }

  newReminder() {
    // FIRST WAY:
    // If I don't pass a second argument to connect()
    //
    // this.props.dispatch({
    //   type: 'ADD_REMINDER',
    //   text: this.state.text
    // })

    // SECOND WAY:
    // If I do pass a second argument to connect()
    // in the form of a mapDispatchToProps() function OR
    // an object with my action creators
    this.props.createReminder__ActionCreator(this.state.text, this.state.dueDate)
    this.setState({text: '', dueDate: ''})
  }

  deleteReminder(id) {
    this.props.deleteReminder__ActionCreator(id)
  }

  renderReminders() {
    const { thingsToDo } = this.props;

    return(
      <ul className="list-group">
        {
          thingsToDo.map(reminder => {
            return(
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div>{moment(new Date(reminder.dueDate)).fromNow()}</div>
                </div>
                <em><div className="delete-button" onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</div></em>
              </li>
            )
          })
        }
      </ul>
    )
  }

  destroyReminders() {
    this.props.clearReminders__ActionCreator()
  }

  render() {
    return(
      <div className="App">
        <h1 className="title row">
          Unforget
        </h1>

      <div className="form-inline reminder-form">
        <div className="form-group">
          <input
            className="form-control"
            placeholder="I have to..."
            onChange={ event => this.setState({text: event.target.value}) }
            value={this.state.text}
          />
          <input
            className="form-control"
            type="datetime-local"
            value={this.state.dueDate}
            onChange={ event => this.setState({dueDate: event.target.value}) }
          />
          <button type="button"
            className="btn btn-success"
            onClick={() => this.newReminder()}
          >
            Add it
          </button>
        </div>

        <div>
          {this.renderReminders()}
        </div>

        <button type="button"
            className="btn btn-danger"
            onClick={() => this.destroyReminders()}
          >
            Delete All Unforgetters
          </button>
      </div>
    </div>
    )
  }
}

// mapStateToProps(), is a function you provide to pull data from the store when it changes,
// and pass those values as props to your component.
// In other words, this will subscribe the App component to Redux store updates
// Any time the store is updated, mapStateToProps will be called.
// The results of mapStateToProps must be a plain object, which will
// be merged into the component’s props.
//
// If your mapStateToProps function is declared as taking two parameters,
// it will be called with the store state as the first parameter and the
// props passed to the connected component as the second parameter, and will
// also be re-invoked whenever the connected component receives new props
// as determined by shallow equality comparisons. (The second parameter
// is normally referred to as ownProps by convention.)
//
// Or in other words, the mapStateToProps function takes a single argument
 // of the entire Redux store’s state and returns an object to be passed as props.
 // It is often called a selector.
function mapStateToProps(state__reminders) {
  return {
    thingsToDo: state__reminders
  }
}

/*
mapDispatchToProps() - allows action creators to become accessible within React Components through this.props

mapDispatchToProps(), is a function you provide to make use of the store's dispatch function,
usually by creating pre-bound versions of action creators that will
automatically dispatch their actions as soon as they are called.

https://github.com/reactjs/react-redux/blob/master/
      docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
!!!If an object is passed, each function inside mapDispatchToProps() is assumed to be a
Redux action creator.
An object with the same function names, but with every action creator wrapped into a
dispatch() call so they may be invoked directly, will be merged into the component’s props.

!!!If a function is passed, it will be given dispatch as the first parameter.
It’s up to you to return an object that somehow uses dispatch to bind action creators
in your own way. (Tip: you may use the bindActionCreators() helper from Redux.)

!!!If you do not supply your own mapDispatchToProps function or object full of action creators,
the default mapDispatchToProps implementation just injects dispatch into your component’s props.

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createReminder__ActionCreator }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
*/

///////////////
// The following will make dispatch() available as a prop in the component:
// http://redux.js.org/docs/faq/ReactRedux.html#react-props-dispatch
//
// export default connect(mapStateToProps)(App)
//
// The following will make your action creators available as props in the component
const actionCreators = {
  createReminder__ActionCreator,
  deleteReminder__ActionCreator,
  clearReminders__ActionCreator
}

export default connect(mapStateToProps, actionCreators)(App)
