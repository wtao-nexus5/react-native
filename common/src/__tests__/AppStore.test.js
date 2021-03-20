import * as React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AppStore from '../AppStore'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

describe('AppStore', () => {
  it('provides', () => {
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((_) => [null, jest.fn()]);
    const wrapper = shallow(<AppStore.AppContextProvider />);
    const keys = Object.keys(wrapper.props().value);
    const fieldNames = [
      'pathogens',
      'setPathogens',
      'modeEnum',
      'currentPid',
      'setCurrentPid',
      'editMode',
      'setEditMode',
      'showError',
      'setShowError',
      'errorMsg',
      'setErrorMsg',
      'busy',
      'setBusy',
      'landscape',
      'setLandscape',
      'restApi',
      'safeApiCall',
      'searchQuery',
      'setSearchQuery',
      'dirty',
      'setDirty'
    ];
    const allMatch = keys.reduce(
      (accum, key) => accum && (fieldNames.indexOf(key) > -1 ? true : false),
      true
    );
    expect(allMatch).toBe(true);
  })
})
