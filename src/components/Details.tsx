import { Avatar, Button, Card, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { onError } from '../utils';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import { postType } from './InfiniteScroll';
import moment from 'moment';
import TagComp from './Tag';
import Header from './Header';

const Details = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<any>();

  const { id } = useParams();

  useEffect(() => {
    // fetch data when page is load
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const data = await response.json();

      //get one author
      const filteredData = _.find(data.posts, { id: id });

      setPost(filteredData);
    } catch (e) {
      onError(e);
    } finally {
      setLoading(false);
    }
  };

  const { title, summary, publishDate, author, categories } = post;

  return (
    <div style={{ margin: 100 }}>
      <Header text="Back" hasGoBack />

      <p style={{ fontWeight: 700 }}>Details</p>
      <Card loading={loading}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Author">
            <Avatar
              style={{ marginRight: 7 }}
              size={'large'}
              src={author?.avatar}
            />
            {_.startCase(author?.name)}
          </Descriptions.Item>
          <Descriptions.Item label="Title">
            {_.startCase(title)}
          </Descriptions.Item>
          <Descriptions.Item label="Summary">
            {_.upperFirst(summary)}
          </Descriptions.Item>
          <Descriptions.Item label="Publish Date">
            {moment(publishDate).format('DD-MM-YYYY')}
          </Descriptions.Item>

          <Descriptions.Item label="Categories">
            <TagComp categories={categories} />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Details;
