import React from 'react';

import TaskCard from '../components/TaskCard';

import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';

export default class TaskList extends React.Component {
  state = {
    date: "2020-05-26",
    tasks: []
  }

  componentDidMount() {
    axios.get('http://18.191.91.177:8080/tasks/'+this.props.date)
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks: tasks });
        console.log(tasks);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
            { this.state.tasks.map(task => <TaskCard taskName={task.taskName} time={task.time} status={task.status} justification={task.justification} />)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container:{
		padding:0,
	},
});