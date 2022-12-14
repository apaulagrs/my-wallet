import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    if (!expenses.length) {
      return '0';
    }
    const totalSum = expenses.reduce((total, expense) => total + expense.value);
    console.log(totalSum);
    return totalSum;
  };

  render() {
    const { email } = this.props;
    const BRL = 'BRL';
    const despesaTotal = this.totalExpenses();
    return (
      <header>
        <span data-testid="email-field">{`Email: ${email}`}</span>
        <span data-testid="total-field">{despesaTotal}</span>
        <span data-testid="header-currency-field">{`Câmbio: ${BRL}`}</span>
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
