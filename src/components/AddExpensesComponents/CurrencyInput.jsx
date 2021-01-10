import React from 'react';
import PropTypes from 'prop-types';

export default function Currency({ currencies, changeState }) {
  return (
    <label htmlFor="currency">
      Moeda:
      <select
        id="currency"
        data-testid="currency-input"
        onChange={ changeState }
      >
        {Object.keys(currencies).filter((cur) => cur !== 'USDT')
          .map((currencie, i) => (
            <option
              key={ `${currencie + i}` }
              data-testid={ currencie }
            >
              { currencie }
            </option>
          ))}
      </select>
    </label>
  );
}

Currency.propTypes = {
  changeState: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
};
