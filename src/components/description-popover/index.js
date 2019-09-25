import React from "react"
import { Typography, Tag } from 'antd'

const { Title, Paragraph } = Typography

const GenreTags = (info) => {
  if (info !== null && info.genre !== null) {
    return (<Paragraph>
      {info.genre.map(g => (
        <Tag color="#00c8f8">{g}</Tag>
      ))}
    </Paragraph>)
  }

  return <></>;
}

const DescriptionPopover = ({ programs }) => {
  return (
    <div style={{ minWidth: `240px`, maxWidth: `480px`, wordBreak: `keep-all` }}>
      <Typography>
        {programs.map(program => {
          return (
            <>
              <Title level={4}>
                {program.title}
              </Title>
              {GenreTags(program.info)}
              <Paragraph>{program.desc}</Paragraph>
            </>);
        })}
      </Typography>
    </div>
  );
};

export default DescriptionPopover;