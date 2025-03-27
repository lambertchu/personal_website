import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Layout } from '@components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledTableContainer = styled.div`
  header {
    margin-bottom: 100px;
    text-align: center;
  }

  @media (max-width: 768px) {
    margin: 50px -10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }
    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }
    th,
    td {
      padding: 10px;
      text-align: left;
      &:first-child {
        padding-left: 20px;
        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;
        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
    tr {
      cursor: default;
      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }
    td {
      &.year {
        padding-right: 20px;
        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }
      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }
      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }
      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;
        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }
      &.links {
        min-width: 100px;
        div {
          display: flex;
          align-items: center;
          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }
          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

const ArchivePage = ({ location, data }) => {
  const projects = data.allMarkdownRemark.edges;
  const revealTitle = useRef(null);
  const revealTable = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealTable.current, srConfig(200, 0));
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Projects" />

      <main>
        <StyledTableContainer ref={revealTable}>
          <header ref={revealTitle}>
            <h1 className="big-heading">Projects</h1>
            <p className="subtitle">What I've worked on.</p>
          </header>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 &&
                projects.map(({ node }, i) => {
                  const { date, external, title } = node.frontmatter;
                  return (
                    <tr key={i} ref={el => (revealProjects.current[i] = el)}>
                      <td className="overline year">{`${new Date(date).toLocaleDateString()}`}</td>

                      <td className="title">{title}</td>

                      <td className="links">
                        <div>
                          {external && (
                            <a href={external} aria-label="External Link">
                              <Icon name="External" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </StyledTableContainer>
      </main>
    </Layout>
  );
};
ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArchivePage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            date
            title
            external
          }
          html
        }
      }
    }
  }
`;
