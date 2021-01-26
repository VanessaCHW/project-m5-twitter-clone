import React from "react";
import styled, {keyframes} from "styled-components";

import { Icon } from 'react-icons-kit';
import {spinner2} from 'react-icons-kit/icomoon/spinner2'

const LoadingIcon = () => {
    return <SectionBox>
        <StyledIcon icon={spinner2} size={40}/>
    </SectionBox>
}

export default  LoadingIcon;

const turnIcon = keyframes`
    0% { transform: rotate(0deg)}
    100%{ transform: rotate(360deg)}
`;

const StyledIcon = styled(Icon)`
    color: gray;
    animation: ${turnIcon} 1s linear infinite normal;
`

const SectionBox = styled.div`
    border: 1px solid #EBEEF0;
    border-bottom: none;
    padding: 12px 14px;
    height: 100%;
    text-align: center;
    padding-top: 100px;
    box-sizing: border-box;
`;