import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, initEditExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { /* currencies, */ expenses, dispatch } = this.props;
    /* const { value,
      description,
      currency,
      method,
      tag,
      editor } = expenses; */

    return (
      <div>
        {
          /* editor && (
            <main>
              <div>
                <label htmlFor="value-input">
                  Valor da despesa:
                  <input
                    type="number"
                    name="value"
                    id="value-input"
                    data-testid="value-input"
                    value={ value }
                  />
                </label>
              </div>
              <div>
                <label htmlFor="description-input">
                  Descrição da despesa:
                  <input
                    type="text"
                    name="description"
                    id="description-input"
                    data-testid="description-input"
                    value={ description }
                  />
                </label>
              </div>
              <div>
                <label htmlFor="currency-input">
                  Moeda:
                  <select
                    name="currency"
                    id="currency-input"
                    data-testid="currency-input"
                    selected={ currency }
                  >
                    {
                      currencies.map((e) => (
                        <option
                          key={ e }
                        >
                          {e}
                        </option>
                      ))
                    }
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="method-input">
                  Método de pagamento:
                  <select
                    name="method"
                    id="method-input"
                    data-testid="method-input"
                    selected={ method }
                  >
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Cartão de crédito">Cartão de crédito</option>
                    <option value="Cartão de débito">Cartão de débito</option>
                  </select>
                </label>
              </div>
              <div>
                <label htmlFor="tag-input">
                  Categoria:
                  <select
                    name="tag"
                    id="tag-input"
                    data-testid="tag-input"
                    selected={ tag }
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Lazer">Lazer</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Saúde">Saúde</option>
                  </select>
                </label>
              </div>
              <div>
                <button
                  type="button"
                  onClick={ () => console.log('dispatch(initEditExpense(id))') }
                >
                  Editar despesa
                </button>
              </div>
            </main>
          ) */
        }
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((e) => {
                const convertCurrencieValue = +e.exchangeRates[e.currency].ask * e.value;

                return (
                  <tr key={ e.id }>
                    <td>{e.description}</td>
                    <td>{e.tag}</td>
                    <td>{e.method}</td>
                    <td>{(+e.value).toFixed(2)}</td>
                    <td>{e.exchangeRates[e.currency].name}</td>
                    <td>{(+e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                    <td>{convertCurrencieValue.toFixed(2)}</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        value={ e.id }
                        onClick={ () => dispatch(initEditExpense(e.id)) }
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        value={ e.id }
                        onClick={ () => dispatch(deleteExpense(e.id)) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
