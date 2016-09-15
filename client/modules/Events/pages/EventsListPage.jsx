import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import bs from '../../../bootstrap/css/bootstrap.css';
import bst from '../../../bootstrap/css/bootstrap-theme.css';

console.log('======================================');
console.log(bs);
console.log('======================================');

import * as eventsActions from '../eventsActions';


class EventsListPage extends React.Component {
  render() {
    const eventRows = this.props.events.map(event => {
      return <li key={event._id}>{event.field} - {event.value}</li>
    })
    return (
      <div>
        <ul>
          {eventRows}
        </ul>
        <button className={classnames(bs['btn'], bs['btn-success'])}>Add New</button>
      </div>
    );
  }
}


EventsListPage.need = [() => { return eventsActions.fetchEvents()}];


function mapStateToProps(state) {
  return {
    events: state.events.data
  }
}


export default connect(mapStateToProps)(EventsListPage);
