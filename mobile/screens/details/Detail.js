import * as React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import DetailStore from './DetailStore';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AppStore from '../appStore';
import I18nStore from '../../I18n/I18nStore';
import validateError from './DetailFieldValidator';

const DetailScreenRoot = props => {
  const navigation = useNavigation();

  const {
    fields,
    pathogen,
    setPid,
    updatePathogen,
    createPathogen,
    getPathogenFieldValue,
    updatePathogenFieldValue,
    fieldErrors,
    updateFieldError,
  } = DetailStore.useDetailStoreContext();
  const {dirty, setDirty, busy, setBusy} = AppStore.useAppContext();
  const {currentDictionary} = I18nStore.useI18nContext();

  React.useEffect(() => {
    if (props.params.id != undefined) setPid(props.params.id);
  }, []);

  const clickHandler = async () => {
    setBusy(true)
    if (props.params.edit) {
      await updatePathogen(pathogen, uploadFile);
    } else {
      await createPathogen(pathogen, uploadFile);
      navigation.goBack();
    }
    setDirty(true);
    setBusy(false);
  };

  const [uploadFile, setUploadFile] = React.useState();

  return (
    <SafeAreaView pointerEvents={busy ? 'none' : 'auto'}>
      <FlatList
        style={{height: '100%'}}
        data={fields}
        renderItem={({item, index}) => {
          switch (index) {
            case 6:
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
                  label={currentDictionary[item]}
                  value={getPathogenFieldValue(index)}
                  onChangeText={text => {
                    updatePathogenFieldValue(index, text);
                    let error = validateError(currentDictionary[item], text);
                    updateFieldError(index, error);
                  }}
                  disabled={index === 5 ? true : false}
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
