import React from 'react';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ProgramTitle = ({ title, titleEng }) => (
  <p className="title">
    {title}
    <span className="title-eng"> {titleEng}</span>
  </p>
);

const ProgramInfo = ({ info }) => (
  <p className="info">
    {Object.keys(info)
      .filter(key => key !== 'genre' && info[key])
      .map(key => (
        <span key={key}>
          {Array.isArray(info[key])
            ? info[key].map(i => <span key={i}>{i}</span>)
            : info[key]}
        </span>
      ))}
  </p>
);

const ProgramCredit = ({ credit }) => (
  <ul className="credit">
    {Object.keys(credit)
      .filter(key => credit[key])
      .map(key => (
        <li key={key}>
          {key[0].toUpperCase() + key.substring(1)}{' '}
          {Array.isArray(credit[key]) ? (
            credit[key].map(c => <span key={c}>{c}</span>)
          ) : (
            <span>{credit[key]}</span>
          )}
        </li>
      ))}
  </ul>
);

const ProgramGenre = ({ genre }) => (
  <div className="genre">
    {genre.map(g => (
      <span key={g} className="genre-tag">
        {g}
      </span>
    ))}
  </div>
);

const HTMLDesc = ({ htmlText }) => (<span dangerouslySetInnerHTML={{ __html: htmlText }}></span>)

const Description = ({ programs, onClose }) => {
  return (
    <div className="description">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="close"
        className="close"
        onClick={onClose}>
        <X />
      </Button>
      {programs.map(program => (
        <div key={program.titleEng} className="program">
          <ProgramTitle title={program.title} titleEng={program.titleEng} />
          {program.info && <ProgramInfo info={program.info} />}
          {program.credit && <ProgramCredit credit={program.credit} />}
          {program.info && program.info.genre && (
            <ProgramGenre genre={program.info.genre} />
          )}
          <p className="desc">
            <HTMLDesc htmlText={program.desc} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Description;
