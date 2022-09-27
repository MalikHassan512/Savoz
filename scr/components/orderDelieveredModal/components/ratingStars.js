//import liraries
import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

// create a component
const RatingStars = () => {
  const [defaultRating, setDefaultRating] = useState(0);
  //   const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const maxRating = [1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      {maxRating.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => setDefaultRating(item)}>
            <Image
              style={styles.imgSize}
              source={
                item <= defaultRating
                  ? require('../../../assets/images/filledStar.png')
                  : require('../../../assets/images/emptyStar.png')
                //   : require('../../../assets/Images/emptyStar.png')
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 60,
    marginVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imgSize: {height: 28, width: 28},
});

//make this component available to the app
export default RatingStars;
