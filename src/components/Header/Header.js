import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import Logo from '../Logo';
import SuperHeader from '../SuperHeader';
import {pxToRem} from "../../utils";

const Header = () => {
  // Our site features two visual headers, but they should be
  // grouped semantically as a single header.
  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <PositionedLogo />
        <Spacer />
        <Nav>
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/new">New&nbsp;Releases</NavLink>
          <NavLink href="/men">Men</NavLink>
          <NavLink href="/women">Women</NavLink>
          <NavLink href="/kids">Kids</NavLink>
          <NavLink href="/collections">Collections</NavLink>
        </Nav>
        <Spacer />
      </MainHeader>
    </header>
  );
};

const MainHeader = styled.div`
  padding: 0 32px;
  border-bottom: 1px solid ${COLORS.gray[300]};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  flex: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 72px;
  margin-left: 100px;
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};
  padding: 0 8px;

  &:first-of-type {
    color: ${COLORS.secondary};
  }
`;

const PositionedLogo = styled(Logo)`
  position: absolute;
  left: ${pxToRem(32)};
`

const Spacer = styled.div`
  flex: 1;
  min-width: ${p => p.minWidth ?? 0};
`

export default Header;
