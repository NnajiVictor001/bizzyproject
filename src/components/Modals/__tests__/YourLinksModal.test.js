import React from 'react';
import { render, screen, act } from '@testing-library/react';
import YourLinksModal from 'components/Modals/YourLinksModal';
import { BrowserRouter as Router } from 'react-router-dom';
import book from 'mocks/book';

const downloadURL = 'https://download.local';
test('it can render the development website URL', async () => {
  await act(() =>
    render(
      <Router>
        <YourLinksModal
          setIsOpen="1"
          image="test.png"
          downloadUrl={downloadURL}
          salesId="255"
          mockup="mockup.png"
          id="1"
        />
      </Router>
    )
  );

  await screen.findByDisplayValue(`${downloadURL}`);

  expect(
    screen.getByDisplayValue(`${book.sub_domain}/${process.env.REACT_APP_CUSTOM_DOMAIN}`, {
      exact: false
    })
  ).toBeTruthy();
});

test('it can render the production website URL', async () => {
  process.env.NODE_ENV = 'production';
  await act(() =>
    render(
      <Router>
        <YourLinksModal
          setIsOpen="1"
          image="test.png"
          downloadUrl={downloadURL}
          salesId="255"
          mockup="mockup.png"
          id="1"
        />
      </Router>
    )
  );

  await screen.findByDisplayValue(`${downloadURL}`);

  expect(
    screen.getByDisplayValue(`https://${book.sub_domain}.${process.env.REACT_APP_CUSTOM_DOMAIN}`)
  ).toBeTruthy();
});
