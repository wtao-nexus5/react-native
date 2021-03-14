import * as React from 'react';
import DetailStore from './DetailStore';
import AppStore from '../appStore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const DetailScreenRoot = (props) => {
    const {
        fields,
        pathogen,
        setPid,
        updatePathogen,
        createPathogen,
        getPathogenFieldValue,
        updatePathogenFieldValue,
    } = DetailStore.useDetailStoreContext();
    const { currentPid, setDirty, editMode } = AppStore.useAppContext();

    React.useEffect(() => {
        if (currentPid != undefined) setPid(currentPid);
    }, [currentPid]);

    const clickHandler = () => {
        if (editMode === 'edit') {
            updatePathogen(pathogen);
        } else {
            createPathogen(pathogen);
        }
        setDirty(true);
    };

    return (
        <div style={styles.root}>
            <Typography variant='h2' noWrap>
                {(() => {
                    switch (editMode) {
                        case 'edit':
                            return 'View and Update';
                        default:
                            return 'Details';
                    }
                })()}
            </Typography>
            {fields.map((field, index) => {
                return (
                    <TextField
                        style={styles.textInput}
                        key={index}
                        variant='outlined'
                        multiline={index == 4 ? true : false}
                        rows={index == 4 ? 8 : 1}
                        label={field}
                        value={getPathogenFieldValue(index)}
                        onChange={event => updatePathogenFieldValue(index, event.target.value)}
                        disabled={editMode === 'init' ? true : false}
                    />
                );
            })}
            <div style={styles.button}>
                <Button
                    size='large'
                    variant='contained'
                    color='primary'
                    onClick={() => {clickHandler}}
                    disabled={editMode === 'init' ? true : false}
                >
                    {(() => {
                        switch (editMode) {
                            case 'create':
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
