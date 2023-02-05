import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import ListPasswordItems from '../ListPasswordItems'

import './index.css'

const passwordItems = []

class HomePage extends Component {
  state = {
    isTrue: false,
    website: '',
    username: '',
    password: '',
    listItems: passwordItems,
    isChecked: false,
    searchInput: '',
  }

  onChangeWebsite = event => {
    // const {websiteValue} = this.state
    this.setState({website: event.target.value})
    // console.log(websiteValue)
  }

  onChangeUsername = event => {
    // const {username} = this.state
    this.setState({username: event.target.value})
    // console.log(username)
  }

  onChangePassword = event => {
    // const {password} = this.state
    this.setState({password: event.target.value})
    // console.log(password)
  }

  onClickAddButton = event => {
    event.preventDefault()

    const {website, username, password} = this.state
    const inputItems = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      listItems: [...prevState.listItems, inputItems],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  deleteItem = id => {
    const {listItems} = this.state
    const newList = listItems.filter(eachItem => eachItem.id !== id)
    const caseOf = newList.length !== 0
    this.setState({listItems: newList, isTrue: caseOf})
  }

  onClickCheckBox = event => {
    if (event.target.checked) {
      this.setState({isChecked: true})
    } else {
      this.setState({isChecked: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderInputContainer = () => {
    const {website, username, password} = this.state

    return (
      <div className="add-website-container">
        <form
          className="input-feild-container"
          onSubmit={this.onClickAddButton}
        >
          <h1 className="heading">Add New Password</h1>
          <div className="inputs-container">
            <img
              alt="website"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              className="input-logo"
            />
            <input
              value={website}
              type="text"
              className="input-box"
              onChange={this.onChangeWebsite}
              placeholder="Enter Website"
            />
          </div>
          <div className="inputs-container">
            <img
              alt="username"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              className="input-logo"
            />

            <input
              value={username}
              type="text"
              className="input-box"
              onChange={this.onChangeUsername}
              placeholder="Enter Username"
            />
          </div>
          <div className="inputs-container">
            <img
              alt="password"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              className="input-logo"
            />
            <input
              value={password}
              type="password"
              className="input-box"
              onChange={this.onChangePassword}
              placeholder="Enter password"
            />
          </div>
          <div className="button-container">
            <button className="button" type="submit">
              Add
            </button>
          </div>
        </form>
        <img
          alt="password manager"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          className="image"
        />
      </div>
    )
  }

  renderMyPasswordContainer = () => {
    const {listItems, searchInput, isChecked} = this.state
    let {isTrue} = this.state
    const filterList = listItems.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (filterList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="add-passwords-container">
        <div className="password-search-container">
          <h1>
            Your Passwords <p>{listItems.length}</p>
          </h1>
          <div className="search-container">
            <img
              className="search-icon"
              alt="search"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            />
            <input
              type="search"
              className="input-box"
              placeholder="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <hr />
        <div className="check-box-container">
          <input
            type="checkbox"
            id="show-box"
            onChange={this.onClickCheckBox}
          />
          <label htmlFor="show-box" className="show-password-name">
            Show passwords
          </label>
        </div>

        {!isTrue && (
          <div className="no-password-container">
            <img
              className="no-password-image"
              alt="no passwords"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            />
            <p>No Passwords</p>
          </div>
        )}
        {isTrue && (
          <ul className="ul-container">
            {filterList.map(eachItem => (
              <ListPasswordItems
                key={eachItem.id}
                inputValues={eachItem}
                deleteItem={this.deleteItem}
                isChecked={isChecked}
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="home-page-container">
        <img
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="password-logo"
        />
        {this.renderInputContainer()}
        {this.renderMyPasswordContainer()}
      </div>
    )
  }
}

export default HomePage
