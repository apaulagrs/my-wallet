import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const zero = 0;

    if (!expenses.length) {
      return zero.toFixed(2);
    }

    const totalSum = expenses.reduce(
      (total, expense) => total + expense
        .exchangeRates[expense.currency].ask * expense.value,
      0,
    );

    return totalSum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    const BRL = 'BRL';
    const despesaTotal = this.totalExpenses();
    return (
      <header>
        <p>
          Email:
          <span data-testid="email-field">{email}</span>
        </p>
        <p>
          Despesas:
          <span data-testid="total-field">{despesaTotal}</span>
        </p>
        <p>
          Câmbio:
          <span data-testid="header-currency-field">{BRL}</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
