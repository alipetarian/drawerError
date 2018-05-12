import React, { Component } from 'react';
import { Container, Content, Header, Body } from 'native-base';

import { StatusBar, KeyboardAvoidingView, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import StarRating from 'react-native-star-rating';
import { Map } from '../components/Map';
import { InputWithButtonLast } from '../components/TextInput';
import { SERVER_ADDRESS } from '../config/globals';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
    };
  }

  handlePressSearch = () => {
    console.log('press Search', SERVER_ADDRESS);
  };

  handleChangeText = () => {
    console.log('text changed');
  };

  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating,
    });
  }
  render() {
    return (
      <Container>
        <View style={styles.container} >
          <Text>This is test Screen </Text>
          <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={'pink'}
          />

        </View>
      </Container>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
  },
});

export default Test;
