import { graphql } from 'react-relay';

export default graphql`
  query AppQuery {
    jedis {
      id,
      name,
      houses {
        id,
        address(includePostalCode: true)
      }
    }
  }
`;
