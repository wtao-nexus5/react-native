import * as React from 'react';
import DetailStore from './DetailStore';
import AppStore from '../appStore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import I18nStore from '../../I18n/I18nStore';
import validateError from './DetailFieldValidator';

const DetailScreenRoot = (props) => {
    const {
        fields,
        pathogen,
        fetchPathogen,
        updatePathogen,
        createPathogen,
        getPathogenFieldValue,
        updatePathogenFieldValue,
        resetPathogen,
        fieldErrors,
        updateFieldError,
    } = DetailStore.useDetailStoreContext();
    const {
        modeEnum,
        setEditMode,
        setCurrentPid,
        currentPid,
        setDirty,
        editMode,
        setBusy
    } = AppStore.useAppContext();
    const { currentDictionary } = I18nStore.useI18nContext();

    React.useEffect(() => {
        if (currentPid != undefined) fetchPathogen(currentPid);
        else resetPathogen();
    }, [currentPid]);

    const clickHandler = async () => {
        setBusy(true)
        if (editMode === modeEnum.edit) {
            await updatePathogen(pathogen, uploadFile);
        } else {
            let result = await createPathogen(pathogen, uploadFile);
            setEditMode(modeEnum.edit);
            setCurrentPid(result.id);
        }
        setDirty(true);
        setBusy(false);
    };

    const [uploadFile, setUploadFile] = React.useState();

    return (
        <div style={styles.root}>
            <Typography variant='h2' noWrap style={{ marginTop: 20 }}>
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
            <div style={{ height: 2, backgroundColor: 'lightgray' }} />
            {fields.map((field, index) => {
                return (
                    <TextField
                        style={styles.textInput}
                        key={index}
                        variant='outlined'
                        multiline={index == 4 ? true : false}
                        rows={index == 4 ? 8 : 1}
                        label={currentDictionary[field]}
                        value={getPathogenFieldValue(index)}
                        onChange={(event) => {
                            updatePathogenFieldValue(index, event.target.value);
                            let error = validateError(
                                currentDictionary[field],
                                event.target.value
                            );
                            updateFieldError(index, error);
                        }}
                        error={fieldErrors[index]}
                        disabled={editMode === modeEnum.init ? true : (index === 5 ? true : false)}
                    />
                );
            })}
            <input style={{marginLeft: 10}} type='file' onChange={event => setUploadFile(event.target.files[0])}/>
            <div style={styles.button}>
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    onClick={clickHandler}
                    disabled={editMode === modeEnum.init ? true : false}
                >
                    {(() => {
                        switch (editMode) {
                            case modeEnum.create:
                                return 'Create New';
                            default:
                                return 'Update';
                        }
                    })()}
                </Button>
            </div>
        </div>
    );
};

const DetailScreen = (props) => {
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
