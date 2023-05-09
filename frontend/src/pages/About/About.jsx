import React from 'react';
import { Card } from 'antd';
// import './About.css';
const { Meta } = Card;
function About() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        hoverable
        style={{ width: '50%' }}
        cover={
          <img
            alt="github-stats"
            src="https://github-readme-stats.vercel.app/api/pin/?username=kami11e&repo=ensta-in211"
          />
        }
        onClick={() =>
          window.open('https://github.com/kami11e/ensta-in211', '_blank')
        }
      >
        <Meta title="PROJET IN211" />
      </Card>
    </div>
  );
}

export default About;
