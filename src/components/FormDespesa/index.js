import React from 'react';

class FormDespesa extends React.Component {
  render() {
    return (
      <div>
        <div>
          <form>
            <div>
              <label htmlFor="value">Valor:</label>
              <input
                name="value"
                id="value"
                type="number"
                data-testid="value-input"
              />
            </div>
            <div>
              <label htmlFor="description">Descrição:</label>
              <input
                name="description"
                id="description"
                type="text"
                data-testid="description-input"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FormDespesa;
