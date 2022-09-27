import React, {useState} from 'react';
import {Switch} from 'react-native';
import {Colors} from '../../constants';

const RNSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Switch
      trackColor={{false: Colors.GRAY.default, true: Colors.GREEN.default}}
      thumbColor={isEnabled ? Colors.WHITE.default : Colors.WHITE.default}
      value={isEnabled}
      onValueChange={toggleSwitch}
    />
  );
};

export default RNSwitch;
