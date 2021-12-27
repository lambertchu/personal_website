import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>Why don't we start from the beginning?</p>
            <p>
              I was born and raised on Long Island, New York. I studied computer science and
              management science at MIT. During my freshman year, I pitched on the varsity baseball
              team for a grand total of one inning (and thankfully didn’t give up any runs!)
            </p>

            <p>
              During my senior year, I co-founded Point with two of my fraternity brothers. Our team
              built an NLP-powered product to help people write emails faster. We were funded by
              investors like Y Combinator and Slow Ventures, featured in{' '}
              <a
                href="https://www.forbes.com/sites/frederickdaso/2018/02/28/this-mit-and-harvard-startup-is-making-writing-e-mails-easier-and-effortless"
                target="_blank"
                rel="noreferrer"
              >
                Forbes
              </a>
              , and reached #4 Product of the Day on{' '}
              <a
                href="https://www.producthunt.com/posts/easyemail"
                target="_blank"
                rel="noreferrer"
              >
                Product Hunt.
              </a>
            </p>

            <p>
              I then joined the front office of the New York Yankees as a member of the baseball
              operations department. Now, I’m pursuing my interests in technology, business, and
              sports as a software engineer for{' '}
              <a href="https://deca.art" target="_blank" rel="noreferrer">
                Deca
              </a>
              , where we are building a social network for NFTs.
            </p>

            <p>
              So what do I write about on here? Anything that interests me! As of now, expect to see
              content related to sports, technology, finance, and crypto.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me-headshot.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>

          <br></br>
          <br></br>

          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me-baseball.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
