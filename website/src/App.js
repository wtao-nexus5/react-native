import './App.css';
import HomeScreen from './screens/home/Home';
import DetailScreen from './screens/details/Detail';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import AppStore from './screens/appStore';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

function App() {
    const classes = useStyles();
    const {
        modeEnum,
        setCurrentPid,
        setEditMode,
        setSearchQuery,
        setDirty,
        showError,
        setShowError,
        errorMsg,
    } = AppStore.useAppContext();

    return (
        <div className={classes.grow}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        className={classes.menuButton}
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant='h6' noWrap>
                        Website
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search…'
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={(event) => {
                                setSearchQuery(event.target.value);
                                setDirty(true);
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            color='inherit'
                            onClick={() => {
                                setEditMode(modeEnum.create);
                                setCurrentPid(undefined);
                            }}
                        >
                            <Badge color='secondary'>
                                <AddIcon />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <div style={styles.root}>
                <div style={{ width: '40%' }}>
                    <HomeScreen />
                </div>
                <div style={{ width: '3px', backgroundColor: 'lightgray' }} />
                <div style={{ width: '60%' }}>
                    <DetailScreen />
                </div>
            </div>
            <Snackbar open={showError} autoHideDuration={6000} onClose={()=> setShowError(false)}>
                <Alert onClose={()=> setShowError(false)} severity='error'>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
    },
};

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default App;
