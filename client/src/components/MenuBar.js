import React, { useContext, useState } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name='Co-chef'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='Cooking sessions'
          active={activeItem === 'Cooking sessions'}
          onClick={handleItemClick}
          as={Link}
          to={`/cooking-sessions`}
        />
        <Menu.Item
          name='Create Cooking Session'
          active={activeItem === 'Create Cooking Session'}
          onClick={handleItemClick}
          as={Link}
          to={`/new`}
        />
        <Menu.Item
          name='Challenges'
          active={activeItem === 'Challenges'}
          onClick={handleItemClick}
          as={Link}
          to={`/challenges`}
        />
        <Menu.Item
          name='About Co-chef'
          active={activeItem === 'About co-chef'}
          onClick={handleItemClick}
          as={Link}
          to={`/about`}
        />
        <Dropdown
          simple
          item
          name="profile"
          active={activeItem === 'profile'}
          onClick={handleItemClick}
          as={Link}
          to={`/profile/${user.username}`}
          text="Profile"
        >
          <Dropdown.Menu>
            <Dropdown.Item>
              <Menu.Item
                style={{ marginTop: -25 }}
                name='logout'
                onClick={logout}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* 
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={handleItemClick}
          as={Link}
          to={`/profile/${user.username}`}
        >
        </Menu.Item> */}

      </Menu.Menu>
    </Menu>
  ) : (
      <Menu pointing secondary size="massive" color="teal">
        <Menu.Item
          name='Co-chef'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    )

  return menuBar
}

export default MenuBar;