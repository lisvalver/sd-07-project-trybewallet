import React from 'react';

class FormDespesa extends React.Component {
  render() {
    return (
      <div>
        <div>
          <form>
            <div>
              Valor:
              <input
                name="value"
                type="number"
                data-testid="value-input"
              />
            </div>
            <div>
              Descrição:
              <input
                name="description"
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
