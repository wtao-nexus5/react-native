import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router-dom';
import {HomeStore, AppStore} from 'common-lib';

const HomeScreenRoot = ({props}) => {
  const history = useHistory();
  const {fetchPathogens} = HomeStore.useHomeStoreContext();
  const {
    searchQuery,
    pathogens,
    modeEnum,
    dirty,
    setDirty,
    setCurrentPid,
    setEditMode,
    landscape,
  } = AppStore.useAppContext();

  React.useEffect(() => {
    if (dirty) {
      fetchPathogens(`name=${searchQuery}`);
      setDirty(false);
    }
  }, [searchQuery, dirty]);

  return (
    <List>
      {pathogens.map((item, index) => (
        <Card key={index}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              color="textPrimary"
              gutterBottom>
              {item.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {item.scientificName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                setEditMode(modeEnum.edit);
                setCurrentPid(item.id);
                if (!landscape) {
                  history.push('/detail');
                }
              }}>
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
    </List>
  );
};

const HomeScreen = ({props, navigation}) => {
  return (
    <HomeStore.HomeContextProvider>
      <HomeScreenRoot />
    </HomeStore.HomeContextProvider>
  );
};

const styles = makeStyles({});

export default HomeScreen;
