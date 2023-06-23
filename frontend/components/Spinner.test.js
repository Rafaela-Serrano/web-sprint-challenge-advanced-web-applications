// Import the Spinner component into this file and test
import Spinner from "./Spinner" ;
import { render, screen } from '@testing-library/react';
// that it renders what it should for the different props it can take.
test('sanity', () => {
  expect(true).toBe(false)
})

test('renders spinner with props changes', () => {

  const {rerender} = render ( <Spinner on={false}/> ) ;

  expect( screen.queryAllByTestId("spinner") ).toBeFalsy()
  expect( screen.queryByText('Please wait...')).not.toBeInTheDocument()

  rerender ( <Spinner on={true}/> ) ; 

  expect( screen.queryAllByTestId("spinner") ).toBeTruthy()
  expect( screen.queryByText('Please wait...')).toBeInTheDocument()

})

