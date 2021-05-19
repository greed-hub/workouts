import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MobileMenuContainer = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: linear-gradient(#0072AD, transparent) no-repeat;
    display: grid;
    align-items: center;
    justify-items: center;
    left: 0;
    top: 100px;
    width: 100%;
    top: ${({menuOpen}) => (menuOpen ? '100px' : '-100%')};
    transition: all 0.3s ease-in-out;
    
  }

`

export const Mobile = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(8, 80px);

`

export const MobileLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-items: center;
  font-size: 1.4rem;
  text-decoration: none;
  list-style: none;
  transition: 0.3 ease-in-out;
  color: #F59927;
  cursor: pointer;

  &:hover {
    color: red;
    transition: 0.3 ease-in-out;
  }

`
