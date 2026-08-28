import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { Layout } from 'antd';

import '../../fonts/spoqa-han-sans.css';
import './theme.less';
import './tailwind.css';

const { Header, Content } = Layout;

export default ({ name, year, children }) => (
  <StaticQuery
    query={graphql`
      query {
        allSchedule(sort: { date: ASC }) {
          nodes {
            name
            year
            date
            fields {
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <Header>
          <Link
            to={`/`}
            key={`/`}
            style={{ width: `2.5rem`, textAlign: `left` }}>
            HOME
          </Link>
          {getDateLinks(name, year, data)}
        </Header>
        <Content>{children}</Content>
      </Layout>
    )}
  />
);

const getDateLinks = (name, year, data) => {
  return data.allSchedule.nodes
    .filter(node => node.name === name && node.year === year)
    .map(node => {
      const slug = node.fields.slug;
      const date = node.date;

      return (
        <Link to={slug} key={slug} style={{ width: `1.8rem` }}>
          {`${date.substring(3, 5)}`}
        </Link>
      );
    });
};
