import React from 'react';

import { getAllDistinctGrades } from '../../utils';

export const GRADES = {
  G: {
    text: '전체관람가',
  },
  '12': {
    text: '12세 관람가',
  },
  '15': {
    text: '15세 관람가',
  },
  '18': {
    text: '청소년 관람불가',
  },
  '19': {
    text: '청소년 관람불가',
  },
  GV: {
    text: '관객과의 대화',
  },
  PE: {
    text: '프로그램 이벤트',
  },
  E: {
    text: '영어대사',
  },
  KE: {
    text: '한글자막+영어자막',
  },
  KK: {
    text: '시·청각장애인을 위한 배리어프리자막상영',
  },
  KN: {
    text: '한국어대사+영어자막 없음',
  },
  N: {
    text: '비영어대사+영어자막 없음',
  },
  ND: {
    text: '대사없음',
  },
  NO: {
    text: '대사없음',
  },
  NE: {
    text: '비영어대사+영어자막',
  },
};

export const GradeInfo = ({ screening }) => (
  <div
    style={{
      display: `inline-block`,
      marginTop: `0.4rem`,
      marginBottom: `0.4rem`,
    }}>
    {getAllDistinctGrades(screening).map(g => (
      <div key={g} style={{ float: `left`, marginRight: `0.85rem` }}>
        <span className="grade-info-typography">
          <strong>/ {g} /</strong> {GRADES[g].text}
        </span>
      </div>
    ))}
  </div>
);

const Grade = ({ level }) => {
  return (
    <span className="typography">{level}</span>
  );
};

export default Grade;
