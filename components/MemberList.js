import React from 'react';

import MemberCard from '../components/MemberCard';

import axios from 'axios';
import { View } from 'react-native';

import GLOBALS from '../constants/Globals'

export default class MemberList extends React.Component {
  state = {
    members: []
  }

  componentDidMount() {
    axios.get('http://18.190.29.217:8080/api/v1/members/'+GLOBALS.USERNAME)
      .then(res => {
        const members = res.data;
        this.setState({ members: members });
        //alert(JSON.stringify(members));
      })
  }

  render() {
    return (
        <View>
            { this.state.members.map(member => <MemberCard key={member.email} email={member.email} firstName={member.firstName} lastName={member.lastName} image={member.image} />)}
        </View>
    )
  }
}