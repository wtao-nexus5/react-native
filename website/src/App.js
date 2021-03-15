import './App.css';
import React from 'react';
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
import MoreIcon from '@material-ui/icons/MoreVert';
import AppStore from './screens/appStore';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

var useMediaQueryCounter = 0;

const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const MobileRoot = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <HomeScreen />
                </Route>
                <Route exact path='/detail'>
                    <DetailScreen />
                </Route>
            </Switch>
        </div>
    );
};

const DesktopRoot = () => {
    return (
        <div style={styles.root}>
            <div style={{ width: '40%' }}>
                <HomeScreen />
            </div>
            <div style={{ width: '3px', backgroundColor: 'lightgray' }} />
            <div style={{ width: '60%' }}>
                <DetailScreen />
            </div>
        </div>
    );
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
        busy,
        mobileView,
        setMobileView,
    } = AppStore.useAppContext();

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton color='secondary'>
                    <Badge color='secondary'>
                        <AddIcon />
                    </Badge>
                </IconButton>
                <p
                    onClick={() => {
                        setEditMode(modeEnum.create);
                        setCurrentPid(undefined);
                        if (mobileView) {
                            history.push('/detail');
                        }
                    }}
                >
                    New Pathogen
                </p>
            </MenuItem>
        </Menu>
    );
    const history = useHistory();

    const theme = useTheme();
    let matches = useMediaQuery(theme.breakpoints.up('md'));
    useMediaQueryCounter++;
    if (useMediaQueryCounter == 2) {
        matches = !matches; //fix a material react bug
    }
    if (useMediaQueryCounter >= 2) {
        let isMobile = !matches;
        console.log(`is mobile view = ${isMobile}`);
        if (mobileView != isMobile) {
            setMobileView(isMobile);
            setDirty(true);
        }
    }

    return (
        <div
            className={classes.grow}
            style={{ pointerEvents: busy ? 'none' : 'auto' }}
        >
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
                            color='secondary'
                            onClick={() => {
                                setEditMode(modeEnum.create);
                                setCurrentPid(undefined);
                                if (mobileView) {
                                    history.push('/detail');
                                }
                            }}
                        >
                            <Badge color='secondary'>
                                <AddIcon />
                            </Badge>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label='show more'
                            aria-controls={mobileMenuId}
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}
                            color='inherit'
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {mobileView ? <MobileRoot /> : <DesktopRoot />}
            <Snackbar
                open={showError}
                autoHideDuration={6000}
                onClose={() => setShowError(false)}
            >
                <Alert onClose={() => setShowError(false)} severity='error'>
                    {errorMsg}
                </Alert>
            </Snackbar>
            <CircularProgress
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '48%',
                    display: busy ? 'block' : 'none',
                }}
                size={80}
            />
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
