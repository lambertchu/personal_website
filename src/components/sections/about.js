import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { StyledPic } from '../picture';

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
            <p>Why don&lsquo;t we start from the beginning?</p>
            <p>
              I was born and raised on Long Island, New York. I studied computer science and
              management science at MIT. During my freshman year, I pitched on the varsity baseball
              team for a grand total of one inning (and thankfully didn&lsquo;t give up any runs
              😮‍💨)
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
              Since then, I have pursued my interests in technology, markets, sports, and web3. I
              worked in the front office of the New York Yankees as a member of the baseball
              operations department. I was an early core employee at startups Lucky Trader and Deca,
              where I helped analyze, design, and build NFT-based web3 games. I&lsquo;m also a
              member of the{' '}
              <a href="https://www.orangedao.xyz" target="_blank" rel="noreferrer">
                Orange DAO
              </a>
              , a decentralized organization of YC founders advancing web3 through investing in and
              supporting founders.
            </p>

            <p>
              So what do I write about on here? Anything that interests me! Expect to see content
              about my latest passion projects.
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me-ramen.png"
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
