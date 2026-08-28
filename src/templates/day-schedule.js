import React from 'react';
import { graphql } from 'gatsby';
import { Filter as FilterIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { FilterConsumer } from '../context/filter-context';

import { showScreen, showTime } from '../utils';

import Page from '../components/layout';
import Theater from '../components/theater';
import Showtime from '../components/showtime';
import Filter from '../components/filter';
import { GradeInfo } from '../components/grade';

export default ({ data }) => {
  const [visible, setVisible] = React.useState(false);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const { schedule } = data;

  const dayFirstScreenTime = schedule.screening.reduce((min, screen) => {
    const [hour, minute] = screen.times[0].time.split(':').map(Number);
    return hour < min[0] || (hour === min[0] && minute < min[1]) ? [hour, minute] : min;
  }, [23, 59]);

  return (
    <FilterConsumer>
      {({ state, actions }) => (
        <Page name={schedule.name} year={schedule.year}>
          <div className="mb-5 flex items-center gap-2">
            <h2 className="text-3xl font-light">
              {schedule.dateStr}
            </h2>
            <div>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="filter"
                onClick={showDrawer}>
                <FilterIcon />
              </Button>
              <Filter
                visible={visible}
                onClose={closeDrawer}
                screening={schedule.screening}
                state={state}
                actions={actions}
              />
            </div>
          </div>
          <GradeInfo screening={schedule.screening} />
          <div className="flex flex-nowrap justify-start gap-4">
            {schedule.screening.map(
              screen =>
                showScreen(state, screen) && (
                  <div key={screen.theater} className="relative shrink-0">
                    <Theater name={screen.theater} />
                    {screen.times.map(
                      time =>
                        showTime(state, time) && (
                          <Showtime
                            key={`${screen.theater}-${time.time}`}
                            show={time}
                            firstScreenTime={dayFirstScreenTime}
                          />
                        ),
                    )}
                  </div>
                ),
            )}
          </div>
        </Page>
      )}
    </FilterConsumer>
  );
};

export const query = graphql`
  query($name: String!, $year: Int!, $date: String!) {
    schedule(name: { eq: $name }, year: { eq: $year }, date: { eq: $date }) {
      name
      year
      date
      dateStr
      screening {
        theater
        times {
          time
          title
          grades
          code
          programs {
            title
            titleEng
            desc
            info {
              productionCountry
              yearOfProduction
              length
              color
              genre
            }
            credit {
              director
              cast
            }
          }
        }
      }
    }
  }
`;
