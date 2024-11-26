import {Component} from 'react'
import './index.css'

class TransactionItem extends Component {
  onDeleting = () => {
    const {onDelete, details} = this.props
    const {id} = details
    onDelete(id)
  }

  render() {
    const {details, transactionType} = this.props
    const {title, amount} = details
    const {displayText} = transactionType

    return (
      <li className="list-style">
        <p className="list-text">{title}</p>
        <p className="list-text">Rs {amount}</p>
        <p className="list-text">{displayText}</p>
        <button
          data-testid="delete"
          className="delete-btn"
          type="button"
          onClick={this.onDeleting}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="del-icon"
          />
        </button>
      </li>
    )
  }
}

export default TransactionItem
