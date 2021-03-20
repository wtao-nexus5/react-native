import * as React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailScreen from '../Detail';
import {AppStore, I18nStore} from 'common-lib';
import RestApi from '../../../mock/RestApi.mock.js';

Enzyme.configure({adapter: new Adapter()});

const Root = ({children}) => {
  const {
    restApi,
    setPathogens,
    setCurrentPid,
    modeEnum,
    setEditMode,
  } = AppStore.useAppContext();
  React.useEffect(() => {
    (async () => {
      setPathogens(await restApi.getPathogens(query, 0));
      setCurrentPid(0);
      setEditMode(modeEnum.edit);
    })();
  }, []);
  return children;
};

describe('DetailScreen', () => {
  it('display properly', () => {
    const wrapper = mount(
      <AppStore.AppContextProvider api={RestApi()}>
        <I18nStore.I18nProvider>
          <Root>
            <DetailScreen />
          </Root>
        </I18nStore.I18nProvider>
      </AppStore.AppContextProvider>,
    );
  });
});
