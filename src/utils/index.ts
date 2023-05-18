import { message } from 'antd';
import _ from 'lodash';

const getErrorMessage = (error: Error | string | any): string => {
  let message = '';
  const data = _.get(error, 'response.data', {});
  if (_.isString(error)) {
    message = error;
  } else if (Object.keys(data).length !== 0 && data.constructor === Object) {
    message = _.toString(_.get(error, 'response.data.message'));
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};

export const onError = (error: any) => {
  message.error(getErrorMessage(error));
};
