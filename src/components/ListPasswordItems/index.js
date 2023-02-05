import './index.css'

const ListPasswordItems = props => {
  const {inputValues, deleteItem, isChecked} = props
  const {id, username, password, website} = inputValues

  const showPassword = isChecked ? (
    <p>{password}</p>
  ) : (
    <img
      alt="stars"
      className="star-image"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )

  const onClickDelete = () => {
    deleteItem(id)
  }

  return (
    <li className="list-container">
      <div className="passwords">
        <div className="initial-letter">
          <p className="pa">{username[0]}</p>
        </div>

        <div>
          <p className="web-name">{website}</p>
          <p className="username">{username}</p>
          {showPassword}
        </div>
      </div>

      <button
        type="button"
        className="delete-container"
        onClick={onClickDelete}
        testid="delete"
      >
        <img
          className="delete-icon"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default ListPasswordItems
