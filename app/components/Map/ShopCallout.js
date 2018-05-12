
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import StarRating from 'react-native-star-rating';

import { Callout } from 'react-native-maps';

import styles from './styles';

const onPressLearnMore = () => {
  console.log('Learn More is Called');
};


const ShopCallout = props => (
  <Callout onPress={props.onPressCallout} tooltip>
    <View style={styles.calloutContainer}>
      <Text style={styles.calloutHeading}> {props.title }  </Text>
      <StarRating
        disabled
        emptyStar={'ios-star-outline'}
        fullStar={'ios-star'}
        halfStar={'ios-star-half'}
        iconSet={'Ionicons'}
        maxStars={5}
        rating={parseFloat(props.rating)}
        selectedStar={rating => this.onStarRatingPress(rating)}
        fullStarColor="#444"
      />

      {
        props.marker.providerLogo &&
        <Image
          style={styles.providerLogo}
          source={{ uri: props.marker.providerLogo }}
        />
      }

      <View style={styles.buttonContainer}>
        <Button
          style={styles.btn}
          onPress={onPressLearnMore}
          title="More Details"
          accessibilityLabel="Learn more about this purple button"
        >
          Chat
        </Button>

      </View>
    </View>
  </Callout>
);

ShopCallout.propTypes = {
  title: PropTypes.string,
  marker: PropTypes.object,
  onPressCallout: PropTypes.func,
};

export default ShopCallout;
