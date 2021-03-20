jest.mock('react-native-device-info', () => {
    const isLandscapeSync = () => false;
    const isTablet = () => false;
    return {isLandscapeSync, isTablet};
});