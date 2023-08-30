import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  links: {}
};

const footerLinksSlice = createSlice({
  name: 'footerSlice',
  initialState,
  reducers: {
    getLinks: (state) => {
      state.links = {
        listLinks: [
          // {
          //   linkText: "Frequently Asked Questions",
          //   path: "",
          // },
          {
            linkText: 'Request a Feature or Report a Bug',
            path: ''
          },
          {
            linkText: 'Become a Referral Partner',
            path: 'https://rachel568.typeform.com/to/QAlv1reA'
          }
        ],
        links: [
          {
            linkText: 'Terms and Conditions',
            path: '/wip-sales/terms'
          },
          {
            linkText: 'Privacy & Data Use Policy',
            path: '/wip-sales/terms'
          },
          {
            linkText: 'Contact Us',
            path: 'hello@bizzy.ai'
          }
        ]
      };
    }
  }
});

export default footerLinksSlice;

export const footerLinksActions = footerLinksSlice.actions;
