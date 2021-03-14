import * as React from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import DetailStore from './DetailStore';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AppStore from '../appStore';

const DetailScreenRoot = props => {
  const navigation = useNavigation();

  const {
    fields,
    pathogen,
    setPid,
    updatePathogen,
    createPathogen,
    getPathogenFieldValue,
    updatePathogenFieldValue
  } = DetailStore.useDetailStoreContext();
  const {
    dirty,
    setDirty
  } = AppStore.useAppContext();

  React.useEffect(() => {
    if (props.params.id != undefined) setPid(props.params.id);
  }, []);

  const clickHandler = () => {
    if (props.params.edit) {
      updatePathogen(pathogen);
    } else {
      createPathogen(pathogen);
      navigation.goBack();
    }
    setDirty(true);
  };

  return (
    <SafeAreaView>
      <FlatList
        style={{height: '100%'}}
        data={fields}
        renderItem={({item, index}) => {
          switch (index) {
            case 5:
              return (
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={clickHandler}>
                  {props.params.edit ? 'Save' : 'Create'}
                </Button>
              );
            default:
              return (
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  multiline={index == 4 ? true : false}
                  label={item}
                  value={getPathogenFieldValue(index)}
                  onChangeText={text => updatePathogenFieldValue(index, text)}
                />
              );
          }
        }}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};

export default DetailScreen = props => {
  return (
    <DetailStore.DetailContextProvider>
      <DetailScreenRoot params={props.route.params} />
    </DetailStore.DetailContextProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
});
