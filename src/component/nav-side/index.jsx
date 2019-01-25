import React from 'react'
import { NavLink } from 'react-router-dom'
import menuList from './menuList'

class NavSide extends React.Component {
  constructor(props) {
    super(props)
  }
  changMenu(item) {
    item.isOpen = !item.isOpen
  }
  render() {
    return (
      <div className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav">
            {
              menuList.map((item, index) => {
                return (
                  <li key={index} className={item.isOpen ? 'active' : ''}>
                    <NavLink exact to={item.path} activeClassName={item.subMenu.length <= 0 ? 'active-menu' : ''} onClick={() => this.changMenu(item)}>
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                      <span className={item.subMenu.length <= 0 ? '' : 'fa arrow'}></span>
                    </NavLink>
                    <ul className={`nav nav-second-level collapse ${item.isOpen ? 'in' : ''}`}>
                      {item.subMenu.map((val, index) => {
                        return (<li key={index}>
                          <NavLink to={val.path} activeClassName="active-menu" >{val.name}</NavLink>
                        </li>)
                      })}
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default NavSide