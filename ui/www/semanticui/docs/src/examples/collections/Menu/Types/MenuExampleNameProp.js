import React, { Component } from 'react'
import { MenuItem, Menu } from 'semantic-ui-react'

export default class MenuExampleNameProp extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <MenuItem
          name='editorials'
          active={activeItem === 'editorials'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          name='reviews'
          active={activeItem === 'reviews'}
          onClick={this.handleItemClick}
        />
        <MenuItem
          name='upcomingEvents'
          active={activeItem === 'upcomingEvents'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
