import { rest } from 'msw';
import book from './book';

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/sales/sales-page/:salesId`, (req, res, ctx) =>
    res(ctx.json(book))
  )
];
