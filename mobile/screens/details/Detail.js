import * as React from 'react';
import {SafeAreaView, FlatList, StyleSheet, View} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {AppStore, DetailStore}from 'common-lib';
import I18nStore from '../../I18n/I18nStore';

const DetailScreenRoot = props => {
  const {
    fields,
    pathogen,
    fetchPathogen,
    updatePathogen,
    createPathogen,
    getPathogenFieldValue,
    onUpdateField,
    fieldErrors,
  } = DetailStore.useDetailStoreContext();
  const {
    busy,
    modeEnum,
    setEditMode,
    setCurrentPid,
    currentPid,
    editMode,
    landscape,
  } = AppStore.useAppContext();
  const {currentDictionary} = I18nStore.useI18nContext();

  const navigation = landscape ? undefined : useNavigation();

  React.useEffect(() => {
    if (currentPid != undefined) {
      fetchPathogen(currentPid);
    }
  }, [currentPid]);

  const clickHandler = async () => {
    if (editMode === modeEnum.edit) {
      updatePathogen(pathogen, uploadFile);
    } else {
      let result = await createPathogen(pathogen, uploadFile);
      if (navigation) {
        navigation.goBack();
      } else {
        setEditMode(modeEnum.edit);
        setCurrentPid(result.id);
      }
    }
  };

  const [uploadFile, setUploadFile] = React.useState();

  return (
    <SafeAreaView pointerEvents={busy ? 'none' : 'auto'}>
      <Title style={{marginTop: 10, marginLeft: 10}}>
        {(() => {
          switch (editMode) {
            case modeEnum.edit:
              return 'View and Update';
            case modeEnum.create:
              return 'New Pathogen';
            default:
              return 'Details';
          }
        })()}
      </Title>
      <View style={{height: 2, backgroundColor: 'lightgray'}} />
      <FlatList
        style={{height: '100%'}}
        data={fields}
        renderItem={({item, index}) => {
          switch (index) {
            case 6:
              return (
                <Button
                  style={styles.button}
                  mode='contained'
                  onPress={clickHandler}>
                  {(() => {
                    switch (editMode) {
                      case modeEnum.create:
                        return 'Create New';
                      default:
                        return 'Update';
                    }
                  })()}
                </Button>
              );
            default:
              return (
                <TextInput
                  style={styles.textInput}
                  mode='outlined'
                  multiline={index == 4 ? true : false}
                  label={currentDictionary[item]}
                  value={getPathogenFieldValue(index)}
                  onChangeText={text => onUpdateField(index, text)}
                  disabled={editMode === modeEnum.init ? true : (index === 5 ? true : false)}
                  error={fieldErrors[index]}
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
      <DetailScreenRoot />
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
