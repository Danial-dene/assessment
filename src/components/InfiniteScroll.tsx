import { Divider, List, Tag } from 'antd';
import _ from 'lodash';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import TagComp from './Tag';

export type postType = {
  id: string;
  title: string;
  publishDate: string;
  summary: string;
  author: { name: string; avatar: string };
  categories: { id: string; name: string }[];
};

type Props = {
  loadMoreData: () => void;
  posts: any;
  totalPosts: number;
};

const InfiniteScrollComp: React.FC<Props> = ({
  posts,
  loadMoreData,
  totalPosts,
}) => {
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 700,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={posts.length || 0}
        next={loadMoreData}
        //if current posts <= total posts it will stop load next data
        hasMore={posts.length < totalPosts}
        loader={<></>}
        scrollThreshold={'0px'}
        endMessage={<Divider plain>End of posts 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        {/* render item */}
        <List
          dataSource={posts}
          renderItem={(item: postType, index: number) => {
            const { title, author, summary, categories } = item;

            return (
              <Link to={`/details/${item.id}`}>
                <List.Item key={item?.id}>
                  <p style={{ fontWeight: 700 }}>
                    {_.startCase(title)} by {author?.name}
                  </p>
                  {summary}

                  {/* display list of category */}
                  <TagComp categories={categories} />
                </List.Item>
                <Divider />
              </Link>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollComp;
