import React from 'react';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

import { BOX_SIZE } from '../constants';

import Grade from '../grade';
import Description from './description';

const TIME_HEIGHT = 6;
const GUTTER = 1.5;

const calculateTop = (topHour, topMinute, hour, minute) => {
  const timeDistance = ((hour * 60 + minute) - (topHour * 60 + topMinute)) / 60;
  return timeDistance * TIME_HEIGHT + BOX_SIZE + GUTTER;
};

const calculateHeight = length => (length / 60) * TIME_HEIGHT;

const calculteEndTime = (hour, minute, totalLength) => {
  if (totalLength === 0) return ``;

  const calculteHour = minute => Math.floor(minute / 60);

  const endHour =
    hour +
    calculteHour(totalLength) +
    calculteHour(minute + (totalLength % 60));
  const endMinute = (minute + (totalLength % 60)) % 60;

  const endHourStr = endHour < 10 ? `0${endHour}` : `${endHour}`;
  const endMinuteStr = endMinute < 10 ? `0${endMinute}` : `${endMinute}`;

  return `${endHourStr}:${endMinuteStr}`;
};

const getProgramsTotalLength = programs =>
  programs.reduce((acc, program) => acc + getLength(program), 0);

const getLength = program =>
  program.info !== null ? Number(program.info.length.replace('min', '')) : 0;

const Subtitle = ({ subtitle }) => (
  <span className="italic text-muted-foreground">{subtitle}</span>
);

const SubPrograms = ({ subprograms }) => (
  <ul>
    {subprograms.map(program => (
      <li key={program.title}>
        <span className="text-muted-foreground">{program.title}</span>
      </li>
    ))}
  </ul>
);

const Showtime = ({ show, firstScreenTime }) => {
  const [descVisible, setDescVisible] = React.useState(false);

  const hideDescription = () => {
    setDescVisible(false);
  };

  const handleDescVisibleChange = visible => {
    setDescVisible(visible);
  };

  const [topHour, topMinute] = firstScreenTime;
  const [hour, minute] = show.time.split(':').map(Number);

  const totalLength = getProgramsTotalLength(show.programs);

  const endTime = calculteEndTime(hour, minute, totalLength);

  const top = calculateTop(topHour, topMinute, hour, minute);
  const height = calculateHeight(totalLength);

  return (
    <div
      className="showtime"
      style={{
        top: `${top}rem`,
        height: `${height}rem`,
        width: `${BOX_SIZE}rem`,
      }}>
      <Popover open={descVisible} onOpenChange={handleDescVisibleChange}>
        <PopoverTrigger asChild>
          <div style={{ marginTop: `0.375rem` }}>
            <p className="mb-1">
              <span className="font-semibold">
                {show.time}~{endTime}
              </span>
            </p>
            <p className="mb-1">
              <span className="title">{show.title}</span>
              {show.programs.length === 1 && (
                <Subtitle subtitle={show.programs[0].titleEng} />
              )}
              {show.programs.length > 1 && (
                <SubPrograms subprograms={show.programs} />
              )}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-md:fixed max-md:inset-0 max-md:m-0 max-md:h-full max-md:w-full max-md:max-w-none max-md:rounded-none max-md:translate-x-0 max-md:translate-y-0">
          <Description programs={show.programs} onClose={hideDescription} />
        </PopoverContent>
      </Popover>
      <div className="grade">
        {show.code && <span className="code-tag"><span>{show.code}</span></span>}
        {show.grades.map(grade => (
          <Grade key={`${show.time}-${show.title}-${grade}`} level={grade} />
        ))}
      </div>
    </div>
  );
};

export default Showtime;
