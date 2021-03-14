import * as React from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import DetailStore from './DetailStore';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AppStore from '../appStore';

const DetailScreenRoot = props => {
  const navigation = useNavigation();

  const [pathogenCopy, setPathogen] = React.useState({
    name: '',
    scientificName: '',
    family: '',
    viralFactor: '',
    ClinicalSymptoms: '',
  });
  const {
    pathogen,
    setPid,
    updatePathogen,
    createPathogen,
  } = DetailStore.useDetailStoreContext();
  const {
    dirty,
    setDirty
  } = AppStore.useAppContext();
  const fields = [
    'Name',
    'Scientific Name',
    'Family',
    'Viral Factor',
    'Clinical Symptoms',
    'Submit',
  ];

  React.useEffect(() => {
    if (props.params.id != undefined) setPid(props.params.id);
  });

  React.useEffect(() => {
    if (pathogen != undefined) setPathogen(pathogen);
  }, [pathogen]);

  const getPathogenFieldValue = fieldIndex => {
    switch (fieldIndex) {
      case 0:
        return pathogenCopy.name;
      case 1:
        return pathogenCopy.scientificName;
      case 2:
        return pathogenCopy.family;
      case 3:
        return pathogenCopy.viralFactor;
      case 4:
        return pathogenCopy.ClinicalSymptoms;
    }
    return '';
  };

  const updatePathogenFieldValue = (fieldIndex, value) => {
    let copy = {...pathogenCopy};
    switch (fieldIndex) {
      case 0:
        copy.name = value;
        break;
      case 1:
        copy.scientificName = value;
        break;
      case 2:
        copy.family = value;
        break;
      case 3:
        copy.viralFactor = value;
        break;
      case 4:
        copy.ClinicalSymptoms = value;
        break;
    }
    setPathogen(copy);
  };

  const clickHandler = () => {
    if (props.params.edit) {
      updatePathogen(pathogenCopy);
    } else {
      createPathogen(pathogenCopy);
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
