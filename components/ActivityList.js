import React from 'react';

import ActivityCard from '../components/ActivityCard';

import GLOBALS from '../constants/Globals'

import axios from 'axios';
import { View } from 'react-native';

export default class ActivityList extends React.Component {
  state = {
    activities: []
  }

  componentDidMount() {
    //axios.get('http://18.191.91.177:8080/comments/0')
    axios.get(GLOBALS.ENDPOINT+"/careplan/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+global.token
      }
    })
      .then(res => {
        const activities = res.data;
        this.setState({ activities: activities });
        //alert(JSON.stringify(activities));
      })
      .catch((error) => {
        this.setState({ activities: [ ] });
        //alert("Erreur de connexion activities : "+error)
      })
  }

  render() {
    return (
        <View>
            { this.state.activities.map(activity => <ActivityCard key={activity.id} occupation={activity.occupation} activityName={activity.activityName} next={activity.frequency} />)}
        </View>
    )
  }
}