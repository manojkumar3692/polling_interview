import React from "react";
import styled from "@emotion/styled";
import { Typography, Button } from "@mui/material";
import {Link} from 'react-router-dom'
type Props = {};

export default function Header({}: Props) {
  return (
  
  <HeaderContainer>
    <HeaderLogo>
            <img src="https://sabbar.com/wp-content/themes/sabbar-website-2/assets/images/logo-ar.svg" />
    </HeaderLogo>
    <HeaderLogo>
            <ul>
                <li><Link to="/"><Button variant="outlined" color="primary">Admin</Button></Link></li>
           
                <li><Link to="polls"><Button variant="outlined" color="primary">Poll</Button></Link></li>
            </ul>
           
    </HeaderLogo>
  </HeaderContainer>)
}
export const HeaderContainer = styled.div`
  display: flex;
  background: #fff;
  height: 50px;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  box-shadow: 0 5px 30px rgb(0 0 0 / 5%);
`;

export const HeaderLogo = styled.div`
img {
    width : 100px;
}
    ul {
        list-style: none;
        text-decoration: none;
        display: inline-flex;
        color: #fa4a25;
        li {
            margin: 0px 10px;
        }
    }
`
