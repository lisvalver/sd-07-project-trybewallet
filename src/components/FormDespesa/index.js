import React from 'react';

class FormDespesa extends React.Component {
  render() {
    return (
      <div>
        <div>
          <form>
            <label>
              Valor:
              <input
                name="value"
                type="number"
                data-testid="value-input"
              />
            </label>
            <label>
              Descrição:
              <input
                name="value"
                type="text"
                data-testid="description-input"
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default FormDespesa;
