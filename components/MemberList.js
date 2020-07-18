import React from 'react';

import MemberCard from '../components/MemberCard';

import axios from 'axios';
import { View } from 'react-native';

export default class MemberList extends React.Component {
  state = {
    members: []
  }

  componentDidMount() {
    axios.get('http://18.191.91.177:8080/members')
      .then(res => {
        const members = res.data;
        this.setState({ members: members });
        console.log(members);
      })
  }

  render() {
    return (
        <View>
            { this.state.members.map(member => <MemberCard key={member.name} name={member.name} image={member.image} />)}
        </View>
    )
  }
}