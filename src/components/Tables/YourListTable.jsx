import React, { useState } from 'react';

import upArrowBlackMark from 'img/up_arrow_black.svg';
import downArrowBlackMark from 'img/down_arrow_black.svg';
import styles from './YourListTable.module.scss';

function YourListTable(props) {
  const {
    table_container,
    purchased,
    purchased_container,
    purchased_inner_container,
    down_container,
    purchased_bottom
  } = styles;

  const { data } = props;

  const [expansion, setExpansion] = useState([]);

  const handleExpansion = (id) => {
    let array = [...expansion];
    if (expansion.findIndex((e) => e === id) < 0) {
      array = [...array, id];
    } else {
      array.splice(
        expansion.findIndex((e) => e === id),
        1
      );
    }
    setExpansion(array);
  };

  return (
    <div className={table_container}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Last Activity</th>
            <th>Purchased</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{`${val.first_name} ${val.last_name}`}</td>
                <td>{val.phone}</td>
                <td>{val.email}</td>
                <td>{new Date(val.delivered_at).toUTCString()}</td>
                <td>
                  {val.purchased_books.length > 2 ? (
                    <div className={purchased_container}>
                      <div className={purchased_inner_container}>
                        <span className={purchased} style={{ backgroundColor: '#fff8e3' }}>
                          {`${val.purchased_books[0].name}(${val.purchased_books[0].type})`}
                        </span>
                        {expansion.findIndex((e) => e === val.id) < 0 && (
                          <span className={purchased} style={{ backgroundColor: '#ffdf60' }}>
                            {val.purchased_books.length - 1}+
                          </span>
                        )}
                      </div>
                      <div className={down_container} onClick={() => handleExpansion(val.id)}>
                        {expansion.findIndex((e) => e === val.id) >= 0 ? (
                          <img src={upArrowBlackMark} alt="down mark" />
                        ) : (
                          <img src={downArrowBlackMark} alt="up mark" />
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={purchased_container}>
                      <div className={purchased_inner_container}>
                        <span className={purchased} style={{ backgroundColor: '#fff8e3' }}>
                          {`${val.purchased_books[0].name}(${val.purchased_books[0].type})`}
                        </span>
                        {!!val.purchased_books[1] &&
                          !!val.purchased_books[1].name &&
                          expansion.findIndex((e) => e === val.id) < 0 && (
                            <span className={purchased} style={{ backgroundColor: '#fff8e3' }}>
                              {`${val.purchased_books[1].name}(${val.purchased_books[1].type})`}
                            </span>
                          )}
                      </div>
                      {val.purchased_books.length >= 2 && (
                        <div className={down_container} onClick={() => handleExpansion(val.id)}>
                          {expansion.findIndex((e) => e === val.id) >= 0 ? (
                            <img src={upArrowBlackMark} alt="down mark" />
                          ) : (
                            <img src={downArrowBlackMark} alt="up mark" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
              {expansion.findIndex((e) => e === val.id) >= 0 && (
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>
                    {val.purchased_books
                      .filter((element) => element.id !== 0)
                      .map((item, i) => (
                        <span
                          key={i}
                          className={purchased_bottom}
                          style={{ backgroundColor: '#fff8e3' }}>
                          {`${item.name}(${item.type})`}
                        </span>
                      ))}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default YourListTable;
