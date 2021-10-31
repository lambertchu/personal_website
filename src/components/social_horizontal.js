import React from 'react';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Icon } from '@components/icons';

const StyledSocialList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  li {
    a {
      padding: 20px;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

const SocialHorizontal = () => (
  <StyledSocialList>
    {socialMedia &&
      socialMedia.map(({ url, name }, i) => (
        <li key={i}>
          <a href={url} aria-label={name} target="_blank" rel="noreferrer">
            <Icon name={name} />
          </a>
        </li>
      ))}
  </StyledSocialList>
);

export default SocialHorizontal;
