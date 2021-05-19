import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: #0072AD;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  height: 100px;
  width: 100%;

`

export const NavbarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  max-width: 1200px;
  padding: 0 24px;
  background: #0072AD;
  justify-content: space-between;

`

export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #F59927;
  font-size: 1.5rem;
  justify-self: flex-start;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-left: 24px;
  font-weight: 600;
  
`

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  text-align: center;
  list-style: none;
  margin-right: -10px;
  
  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const NavItem = styled.li`
  height: 100px;

`

export const NavLink = styled(Link)`
  cursor: pointer;
  color: #F59927;
  font-size: 1.4rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  
  &:active {
    background: #F59927;
    color: white;
  }
  &:hover {
    color: white;
  }

`

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    cursor: pointer;
    color: #F59927;
    font-size: 1.8rem;
    height: 100%;
    align-items: center;
    padding-right: 24px;
  }

`

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }

`

export const NavBtnLink = styled(Link)`
  border-radius: 50px;
  font-size: 1.2rem;
  background: #F59927;
  color: white;
  padding: 10px 22px;
  text-decoration: none;
  
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: 600;

  &:hover {
    transition: all 0.3s ease-in-out;
    background: white;
    color: #F59927;
  }

`
//outline: none;