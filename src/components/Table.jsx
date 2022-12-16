import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, initEditExpense } from '../redux/actions';

class Table extends Component {
  editButton = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const { value } = target;
    const expenseToEdit = expenses.filter((expense) => expense.id === +value);

    dispatch(initEditExpense(expenseToEdit));
  };

  render() {
    const { expenses, dispatch } = this.props;

    return (
      <div>
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
                        onClick={ this.editButton }
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
