import React, { useEffect, useRef } from 'react';
import { SocialHorizontal } from '@components';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { StyledPic } from '../picture';

const StyledContactSection = styled.section`
  max-width: 900px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .inner {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading">Get In Touch</h2>

      <p>If you'd like to contact me, pick a social media site and slide into my DMs:</p>

      <br></br>

      <SocialHorizontal />

      <br></br>
      <br></br>

      <div className="inner">
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me-staples.jpg"
              quality={100}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/more-kitties.png"
              quality={100}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Cats"
            />
          </div>
        </StyledPic>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
