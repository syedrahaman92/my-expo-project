import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useQuery } from 'react-query'
import { getScheduledDrivers } from '../cloud';

export default function DriverScreen({ navigation }: RootTabScreenProps<'Drivers'>) {
  let query = useQuery('driverData', () => getScheduledDrivers())

   if (query.isLoading) return (<Text>'Loading...'</Text>)
 
   if (query.isError) return (<Text>{'An error has occurred: '+ (query.error?(query.error.message):"")}</Text> )

   let renderDriverCard=({ item, index }) => (
    <View
        style={[styles.item, {
            marginTop: index > 0 ? 25 : 0,
          }]}>
          <View
            style={{justifyContent:"space-between", flexDirection:"row"}}>
            <Text>
              DRIVER ID
            </Text>
            <Text>
              {item.driverID}
            </Text>
          </View>
      </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={query.data.data.getScheduledDrivers}
        renderItem={renderDriverCard}
        keyExtractor={item => item.driverID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 4,
  },
});
