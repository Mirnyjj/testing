import { Flex, Spin } from 'antd';

export const Loader: React.FC = () => (
  <Flex
    justify="center"
    align="center"
    className="relative min-h-[100vh] w-[100%]"
  >
    <Spin size="large" />
  </Flex>
);
