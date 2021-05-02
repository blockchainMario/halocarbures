import React from 'react';

import ActivityCard from '../components/ActivityCard';

import GLOBALS from '../constants/Globals';

import axios from 'axios';
import { View } from 'react-native';

export default class ActivityList extends React.Component {
  state = {
    activities: []
  }

  componentDidMount() {
    //axios.get('http://18.190.29.217:8080/api/v1/comments/0')
    axios.get(GLOBALS.ENDPOINT+"/careplan/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        var activities = res.data;
        //alert(JSON.stringify(activities));
        activities.sort((a, b) => {
          let fa = ""
          let fb = ""
          if (GLOBALS.LANGUAGE == 'fr') {
            fa = a.occupation_Fr.toLowerCase() + a.intervention_Fr.toLowerCase();
            fb = b.occupation_Fr.toLowerCase() + b.intervention_Fr.toLowerCase();
          }
          if (GLOBALS.LANGUAGE == 'en') {
            fa = a.occupation_En.toLowerCase() + a.intervention_En.toLowerCase();
            fb = b.occupation_En.toLowerCase() + b.intervention_En.toLowerCase();
          }
          if (fa < fb) {
              return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;
        });
        this.setState({ activities: activities });
      })
      .catch((error) => {
        this.setState({ activities: [ ] });
        alert("Erreur de connexion activities : "+error)
      })
  }

  render() {
    return (
      (GLOBALS.LANGUAGE == 'fr') ?
      (<View>
            { this.state.activities.map(activity => <ActivityCard key={activity.id} occupation={activity.occupation_Fr} activityName={activity.intervention_Fr} next={activity.nextOccurrence} frequencies={activity.frequencies} />)}
      </View>) :
      (<View>
            { this.state.activities.map(activity => <ActivityCard key={activity.id} occupation={activity.occupation_En} activityName={activity.intervention_En} next={activity.nextOccurrence} frequencies={activity.frequencies} />)}
      </View>)
    )
  }
}