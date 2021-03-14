import * as React from 'react';
import HomeStore from './HomeStore';
import AppStore from '../appStore';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const HomeScreenRoot = ({ props }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const { pathogens, refresh } = HomeStore.useHomeStoreContext();
    const { modeEnum, dirty, setDirty, setCurrentPid, setEditMode } = AppStore.useAppContext();

    React.useEffect(() => {
        if (dirty) {
            refresh('name=_');
        }
    }, [dirty]);

    React.useEffect(() => {
        console.log(pathogens);
        setDirty(false);
    }, [pathogens]);

    const onChangeSearch = (query) => setSearchQuery(query);

    return (
        <List>
            {pathogens.map((item, index) => (
                <Card key={index}>
                    <CardContent>
                        <Typography
                            variant='h5'
                            component='h2'
                            color='textPrimary'
                            gutterBottom
                        >
                            {item.name}
                        </Typography>
                        <Typography color='textSecondary' gutterBottom>
                            {item.scientificName}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size='small'
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                setEditMode(modeEnum.edit);
                                setCurrentPid(index);
                            }}
                        >
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </List>
    );
};

const HomeScreen = ({ props, navigation }) => {
    return (
        <HomeStore.HomeContextProvider>
            <HomeScreenRoot />
        </HomeStore.HomeContextProvider>
    );
};

const styles = makeStyles({});

export default HomeScreen;
