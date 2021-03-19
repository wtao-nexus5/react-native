import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import {DetailStore, AppStore, I18nStore} from 'common-lib';

const DetailScreenRoot = props => {
  const history = useHistory();
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
    modeEnum,
    setEditMode,
    setCurrentPid,
    currentPid,
    editMode,
    landscape,
  } = AppStore.useAppContext();
  const {currentDictionary} = I18nStore.useI18nContext();

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
      if (!landscape) {
        setEditMode(modeEnum.edit);
        setCurrentPid(result.id);
        history.goBack();
      }
    }
  };

  const [uploadFile, setUploadFile] = React.useState();

  return (
    <div style={styles.root}>
      <Typography variant="h2" noWrap style={{marginTop: 20}}>
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
      </Typography>
      <div style={{height: 2, backgroundColor: 'lightgray'}} />
      {fields.map((field, index) => {
        switch (index) {
          case 6:
            return null;
          default:
            return (
              <TextField
                style={styles.textInput}
                key={index}
                variant="outlined"
                multiline={index == 4 ? true : false}
                rows={index == 4 ? 8 : 1}
                label={currentDictionary[field]}
                value={getPathogenFieldValue(index)}
                onChange={event => onUpdateField(index, event.target.value)}
                error={fieldErrors[index]}
                disabled={
                  editMode === modeEnum.init ? true : index === 5 ? true : false
                }
              />
            );
        }
      })}
      <input
        style={{marginLeft: 10}}
        type="file"
        onChange={event => setUploadFile(event.target.files[0])}
      />
      <div style={styles.button}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={clickHandler}
          disabled={editMode === modeEnum.init ? true : false}>
          {(() => {
            switch (editMode) {
              case modeEnum.create:
                return 'Create New';
              default:
                return 'Update';
            }
          })()}
        </Button>
        {!landscape ? (
          <Button
            style={{marginLeft: 20}}
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              history.goBack();
            }}
            disabled={editMode === modeEnum.init ? true : false}>
            Back
          </Button>
        ) : null}
      </div>
    </div>
  );
};

const DetailScreen = props => {
  return (
    <DetailStore.DetailContextProvider>
      <DetailScreenRoot />
    </DetailStore.DetailContextProvider>
  );
};

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '60px',
    marginLeft: '60px',
    marginRight: '60px',
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
};

export default DetailScreen;
