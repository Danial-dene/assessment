import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  hasGoBack: boolean;
  text: string;
};

const Header: React.FC<Props> = ({ hasGoBack, text }) => {
  // disable go back if goBack is false
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!hasGoBack) {
      e.preventDefault();
    }
  };

  return (
    <Link to={'/'} onClick={handleClick}>
      <Button
        style={{ padding: hasGoBack ? '4px 15px' : 0, fontWeight: 700 }}
        type={hasGoBack ? 'primary' : 'text'}
      >
        {text}
      </Button>
    </Link>
  );
};

export default Header;
