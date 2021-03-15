import * as React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import HomeStore from './HomeStore';
import {useNavigation} from '@react-navigation/native';
import {Searchbar, Button, Card, Paragraph} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import AppStore from '../appStore';

const HomeScreenRoot = ({props}) => {
  const {pathogens, refresh} = HomeStore.useHomeStoreContext();
  const {
    dirty,
    setDirty,
    busy,
    searchQuery,
    setSearchQuery,
    setCurrentPid,
    setEditMode,
    modeEnum,
    landscape,
  } = AppStore.useAppContext();
  const navigation = landscape ? undefined : useNavigation();

  React.useEffect(() => {
    if (dirty) {
      refresh(`name=${searchQuery}`);
    }
  }, [dirty]);

  React.useEffect(() => {
    console.log(pathogens);
    setDirty(false);
  }, [pathogens]);

  const onChangeSearch = query => {
    setSearchQuery(query);
    setDirty(true);
  };

  return (
    <SafeAreaView pointerEvents={busy ? 'none' : 'auto'}>
      <View style={{height: '100%'}}>
        <Searchbar
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <FlatList
          data={pathogens}
          renderItem={({item}) => {
            return (
              <Card>
                <Card.Title title={item.name} subtitle={item.scientificName} />
                <Card.Content>
                  <Paragraph>{item.family}</Paragraph>
                  <Paragraph>{item.ClinicalSymptoms}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() => {
                      setEditMode(modeEnum.edit);
                      setCurrentPid(item.id);
                      if (navigation)
                        navigation.navigate('Details');
                    }}>
                    Edit
                  </Button>
                </Card.Actions>
              </Card>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <ActionButton buttonColor='rgba(231,76,60,1)'>
        <ActionButton.Item
          buttonColor='#9b59b6'
          title='New Pathogen'
          onPress={() => {
            setEditMode(modeEnum.create);
            setCurrentPid(undefined);
            if (navigation) navigation.navigate('Details');
          }}>
          <Icon name='md-create' style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#1abc9c'
          title='Search by Genome'
          onPress={() => {}}>
          <Icon name='md-search' style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor='#3498db'
          title='Refresh'
          onPress={() => setDirty(true)}>
          <Icon name='md-refresh' style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </SafeAreaView>
  );
};

export default HomeScreen = ({props, navigation}) => {
  return (
    <HomeStore.HomeContextProvider>
      <HomeScreenRoot />
    </HomeStore.HomeContextProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
