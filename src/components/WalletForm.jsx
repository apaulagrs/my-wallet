import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchWalletReducer } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      expensesValue: 0,
      expensesDescription: '',
      currencyType: 'USD',
      paymentMethod: 'Dinheiro',
      category: 'Alimentação',
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

  buttonClick = async (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { email } = this.state;

    await dispatch(userRequest(email));
  };

  render() {
    const { currencies } = this.props;
    const { expensesValue,
      expensesDescription,
      currencyType,
      paymentMethod,
      category } = this.state;

    return (
      <main>
        <div>
          <label htmlFor="value-input">
            Valor da despesa:
            <input
              type="number"
              name="expensesValue"
              id="value-input"
              data-testid="value-input"
              value={ expensesValue }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="description-input">
            Descrição da despesa:
            <input
              type="text"
              name="expensesDescription"
              id="description-input"
              data-testid="description-input"
              value={ expensesDescription }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currencyType"
              id="currency-input"
              data-testid="currency-input"
              selected={ currencyType }
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
              name="paymentMethod"
              id="method-input"
              data-testid="method-input"
              selected={ paymentMethod }
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
              name="category"
              id="tag-input"
              data-testid="tag-input"
              selected={ category }
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
          <button
            type="button"
            onClick={ this.buttonClick }
          >
            Adicionar despesa
          </button>
        </div>
      </main>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.shape({})),
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
