import {Component} from 'react'
import {v4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    accDetailslist: [],
  }

  onDel = id => {
    const {accDetailslist} = this.state
    const filterArray = accDetailslist.filter(eachItem => eachItem.id !== id)
    this.setState({accDetailslist: filterArray})
  }

  onSubmitting = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    const newDetails = {
      title,
      amount: Number(amount),
      type,
      id: v4(),
    }

    this.setState(prevState => ({
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
      accDetailslist: [...prevState.accDetailslist, newDetails],
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  render() {
    const {title, amount, type, accDetailslist} = this.state
    let incomeAmount = 0
    let expenseAmount = 0

    accDetailslist.forEach(item => {
      if (item.type === 'INCOME') {
        incomeAmount += item.amount
      } else {
        expenseAmount += item.amount
      }
    })

    const balanceAmount = incomeAmount - expenseAmount

    return (
      <div className="whole-container">
        <div className="user-details-container">
          <h1 className="title">Hi, Harinee</h1>
          <p className="description">
            Welcome back to your{' '}
            <span className="highlight-text">Money Manager</span>
          </p>
        </div>
        <ul className="list-container">
          <MoneyDetails
            name="Your Balance"
            amount={balanceAmount}
            dataTestid="balanceAmount"
            image="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            color="green"
          />
          <MoneyDetails
            name="Your Income"
            amount={incomeAmount}
            dataTestid="incomeAmount"
            image="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            color="blue"
          />
          <MoneyDetails
            name="Your Expenses"
            amount={expenseAmount}
            dataTestid="expensesAmount"
            image="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            color="purple"
          />
        </ul>
        <div className="sec-container">
          <form className="form-container" onSubmit={this.onSubmitting}>
            <h1 className="title">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              onChange={this.onChangeTitle}
              value={title}
              type="text"
              id="title"
              placeholder="TITLE"
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <br />
            <input
              onChange={this.onChangeAmount}
              value={amount}
              type="text"
              id="amount"
              placeholder="AMOUNT"
            />
            <br />
            <label htmlFor="type">TYPE</label>
            <br />
            <select onChange={this.onChangeType} id="type" value={type}>
              {transactionTypeOptions.map(eachItem => (
                <option key={eachItem.optionId} value={eachItem.optionId}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
            <br />
            <button className="submit-button" type="submit">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="title">History</h1>
            <ul className="list-container">
              <li className="list-style">
                <p className="list-text bold">Title</p>
                <p className="list-text bold">Amount</p>
                <p className="list-text bold">Type</p>
              </li>
              {accDetailslist.map(eachItem => (
                <TransactionItem
                  details={eachItem}
                  key={eachItem.id}
                  onDelete={this.onDel}
                  transactionType={transactionTypeOptions.find(
                    each => each.optionId === eachItem.type,
                  )}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
