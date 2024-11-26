import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  render() {
    const {name, amount, image, alt, color, dataTestid} = this.props
    return (
      <li className={`background ${color}`}>
        <img className="img" src={image} alt={alt} />
        <div className="content-container">
          <p className="name">{name}</p>
          <p className="amount" data-testid={dataTestid}>
            Rs {amount}
          </p>
        </div>
      </li>
    )
  }
}

export default MoneyDetails
