import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import api from '../../services/api';

import { Container, Header, Avatar, Name, Bio } from './styles';

export default function User({ navigation }) {
  const [stars, setStars] = useState([]);
  const user = navigation.getParam('user');

  useEffect(() => {
    async function loadStars() {
      const user = navigation.getParam('user');
      const response = await api.get(`users/${user.login}/starred`);
      setStars(response.data);
    }
    loadStars();
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar}}/>
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
    </Container>
  );
}

User.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('user').name,
});
