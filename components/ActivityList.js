import React from 'react';

import ActivityCard from '../components/ActivityCard';

import axios from 'axios';
import { View } from 'react-native';

export default class ActivityList extends React.Component {
  state = {
    activities: []
  }

  componentDidMount() {
    axios.get('http://18.191.91.177:8080/careplan')
      .then(res => {
        const activities = res.data;
        this.setState({ activities: activities });
        console.log(activities);
      })
  }

  render() {
    return (
        <View>
            { this.state.activities.map(activity => <ActivityCard occupation={activity.occupation} activityName={activity.activityName} frequency={activity.frequency} />)}
        </View>
    )
  }
}