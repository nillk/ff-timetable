import React from 'react';
import { graphql, Link } from 'gatsby';
import { Video } from 'lucide-react';

import Page from '../components/layout';

export default ({ data }) => {
  const ffInfo = data.allSchedule.group.reduce((acc, curr) => {
    const name = curr.fieldValue;
    const firstSlugOfYear = curr.nodes.reduce((acc, curr) => {
      if (!(curr.year in acc)) {
        acc[curr.year] = curr.fields.slug;
      }
      return acc;
    }, {});

    return [...acc, { name, years: firstSlugOfYear }];
  }, []);

  return (
    <Page>
      <h1 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
        <Video className="size-6" /> Film Festival Timetable
      </h1>
      <div>
        <ul>
          {ffInfo.map(ff => {
            return Object.keys(ff.years).map(year => (
              <li key={`/${ff.name}/${year}`}>
                <Link to={ff.years[year]}>
                  {ff.name.toUpperCase()} {year}
                </Link>
              </li>
            ));
          })}
        </ul>
      </div>
    </Page>
  );
};

export const query = graphql`
  query {
    allSchedule(sort: { date: ASC }) {
      group(field: {name: SELECT}) {
        fieldValue
        nodes {
          year
          fields {
            slug
          }
        }
      }
    }
  }
`;
