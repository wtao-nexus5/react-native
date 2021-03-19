import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useAppContext } from '../AppStore'

describes('AppStore', () => {
  it('provides', () => {
    let spy = jest.spyOn(React, 'useState')

    spy.mockImplementationOnce((value) => [[{ id: 0 }], jest.fn()])
    spy.mockImplementationOnce((value) => [0, jest.fn()])
    spy.mockImplementationOnce((value) => [1, jest.fn()])
    spy.mockImplementationOnce((value) => [true, jest.fn()])
    spy.mockImplementationOnce((value) => ['error', jest.fn()])
    spy.mockImplementationOnce((value) => [false, jest.fn()])
    spy.mockImplementationOnce((value) => [true, jest.fn()])
    spy.mockImplementationOnce((value) => [false, jest.fn()])
    spy.mockImplementationOnce((value) => ['HPV', jest.fn()])

    const result = renderHook(() => useAppContext())
    expect(result.pathogens.length).toBe(1)
  })
})
