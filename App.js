import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';
import FileSystem from 'expo';
import {useState, useEffect} from 'react';
import axios from 'axios';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  const [response, setResponse] = useState({});
  const [data, setData] = useState([]);
  
  useEffect( () => {
    const getWeather = async () => {
      await axios.get('https://api.weather.gov/gridpoints/TOP/46,83/forecast/hourly')
        .then( (r) => { 
          setResponse( r.data );
          setData(r.data.properties.periods)
        })
        .catch( (e) => {
          console.log(`error ${e}`);
        });
    };
    getWeather();
  },[]);



  const renderRow = ({item}) => {
    const [date,time] = item.startTime.split("T");
    return (
      <Card style={styles.card}>
        <Card.Title title={date} subtitle={time} />
        <Card.Content>
          <Text>{item.shortForecast}</Text>
        </Card.Content>
      </Card>
    )    
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={item=>item[0]}
      />
    </View>
  );
}
// https://reactnative.dev/docs/flexbox
// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
const styles = StyleSheet.create({
  dataView: {
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    fontWeight:'bold'
  },
  card:{
    margin: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
