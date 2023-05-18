import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Row,
  Select,
  Space,
} from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { onError } from '../utils';
import InfiniteScrollComp from './InfiniteScroll';
import { useParams } from 'react-router-dom';
import Header from './Header';

type postType = {
  id: string;
  title: string;
  publishDate: string;
  summary: string;
  author: { name: string; avatar: string };
  categories: { id: string; name: string }[];
};

const Posts = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { category } = useParams();

  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ limit: 10, offset: 0 });
  const [posts, setPosts] = useState<postType[]>([]);

  const [totalPosts, setTotalPosts] = useState(0);

  // Get the current URL
  const url = new URL(window.location.href);

  // Create a new URLSearchParams object from the query string
  const searchParams = new URLSearchParams(url.search);

  useEffect(() => {
    // fetch data when page is load
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const data = await response.json();

      // Get the value of a specific query parameter
      const filter = searchParams.get('category');

      // Filter the posts based on specific values
      const filteredData = data.posts.filter((post: postType) => {
        return post.categories.some((category) => category.name === filter);
      });

      // set how many data we want, by default 10
      const limitedPosts = filter
        ? filteredData.slice(0, paging.limit)
        : data.posts.slice(0, paging.limit);

      setTotalPosts(data.posts.length);
      setPosts(limitedPosts);
    } catch (e) {
      onError(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = () => {
    // set new paging and fetch the data back
    setPaging({ limit: paging.limit + 10, offset: 0 });
    fetchData();
  };

  // onFinish func, filter data and fetch
  const onFinish = async (values: any) => {
    const { category } = values;

    if (categories) {
      // Add a new query parameter
      searchParams.set('category', category);

      // Update the query string of the URL
      url.search = searchParams.toString();

      // Replace the current URL with the updated one
      window.history.replaceState(null, '', url.toString());

      // Reset paging
      setPaging({ limit: 10, offset: 0 });

      fetchData();
    }
  };

  return (
    <Card loading={loading} style={{ margin: 30 }}>
      {/* Filter */}
      <Filter form={form} onFinish={onFinish} />

      {/* Header */}
      <Header text="List of posts" hasGoBack={false} />

      {/* List */}
      <InfiniteScrollComp
        loadMoreData={loadMoreData}
        posts={posts}
        totalPosts={totalPosts}
      />
    </Card>
  );
};

// filter component
type FilterProps = {
  form: FormInstance;
  onFinish: (val: string) => void;
};
const Filter: React.FC<FilterProps> = ({ form, onFinish }) => {
  return (
    <Form form={form} onFinish={onFinish}>
      <Row>
        <Col span={10}>
          <Form.Item name="category" label="Filter by category">
            <Select options={categories} />
          </Form.Item>
        </Col>
        <Col span={4} style={{ marginLeft: 4 }}>
          <Button type="primary" onClick={() => form.submit()}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const categories = [
  {
    label: 'Surveys and Forms',
    value: 'Surveys and Forms',
  },
  {
    label: 'Digital Marketing',
    value: 'Digital Marketing',
  },
  {
    label: 'Platform News and Updates',
    value: 'Platform News and Updates',
  },
  {
    label: 'Tips and Best Practise',
    value: 'Tips and Best Practise',
  },
  {
    label: 'Marketing Analytics',
    value: 'Marketing Analytics',
  },
  {
    label: 'Landing Pages',
    value: 'Landing Pages',
  },
  {
    label: 'Ecommerce',
    value: 'Ecommerce',
  },
  {
    label: 'Tips and Best Practise',
    value: 'Tips and Best Practise',
  },
  {
    label: 'Data Management',
    value: 'Data Management',
  },
];
export default Posts;
