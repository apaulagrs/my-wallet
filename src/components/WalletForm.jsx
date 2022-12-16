import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWalletReducer, finalEditExpense, newExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWalletReducer());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addbutton = async (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const allExpenses = {
      value,
      description,
      currency,
      method,
      tag,
    };

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    dispatch(newExpense(allExpenses, data));

    this.setState({
      value: '',
      description: '',
    });
  };

  editButton = async (event) => {
    event.preventDefault();

    const { dispatch, toEdit } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;

    console.log(toEdit);

    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    const allExpenses = {
      id: toEdit[0].id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    dispatch(finalEditExpense(allExpenses));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value,
      description,
      currency,
      method,
      tag } = this.state;

    return (
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
              onChange={ this.handleChange }
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
          {
            !editor ? (
              <button
                type="button"
                onClick={ this.addbutton }
              >
                Adicionar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.editButton }
              >
                Editar despesa
              </button>
            )
          }
        </div>
      </main>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
  editor: PropTypes.bool,
  toEdit: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  toEdit: state.wallet.toEdit,
});

export default connect(mapStateToProps)(WalletForm);
