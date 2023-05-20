import _ from 'lodash';
import React from 'react';
import { Tag } from 'antd';

type Props = {
  categories: { id: string; name: string }[];
};
const TagComp: React.FC<Props> = ({ categories }) => {
  //get color based on name
  const getColor = (name: string) => {
    let color: string;

    if (name === 'Surveys and Forms') {
      color = 'magenta';
    } else if (name === 'Digital Marketing') {
      color = 'volcano';
    } else if (name === 'Platform News and Updates') {
      color = 'orange';
    } else if (name === 'Tips and Best Practise') {
      color = 'gold';
    } else if (name === 'Marketing Analytics') {
      color = 'geekblue';
    } else if (name === 'Landing Pages') {
      color = 'green';
    } else if (name === 'Ecommerce') {
      color = 'cyan';
    } else if (name === 'Tips and Best Practise') {
      color = 'blue';
    } else {
      color = 'purple';
    }

    return color;
  };

  return (
    <div style={{ marginTop: 9 }}>
      {_.map(categories, (category) => {
        return <Tag color={getColor(category.name)}>{category.name}</Tag>;
      })}
    </div>
  );
};

export default TagComp;
