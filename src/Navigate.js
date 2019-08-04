import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class Navigate extends React.Component {
  componentDidMount() {
    const { navigation, route, params } = this.props;
    navigation.navigate(route, params);
  }

  render() {
    return null;
  }
}
Navigate.propTypes = {
  route: PropTypes.string.isRequired,
  params: PropTypes.object,
};

export default withNavigation(Navigate);
