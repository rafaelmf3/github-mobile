import React, {useState, useEffect} from 'react';
import {Keyboard, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  RemoveButton
} from './styles';

export default function Main() {
  const [user, setUser ] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers(){
      const users = await AsyncStorage.getItem('users');
      setUsers(users);
    }
    loadUsers();
  }, []);

  useEffect(() => {
    async function updateUsers(){
      const prevState = await AsyncStorage.getItem('users');
      if (prevState !== users) {
        AsyncStorage.setItem("users", JSON.stringify(users));
      }
    }
    updateUsers();
  }, [users]);

  handleSubmit = async () => {
    const response = await api.get(`users/${user}`);

    const data ={
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    }

    setUsers([...users, data]);

    Keyboard.dismiss();
  };

  handleRemove = async () => {
    // const response = await api.get(`users/${user}`);
    // console.tron.log('Apertei o botão');
    try {
      await AsyncStorage.clear();
      return true;
    } catch(err) {
      console.tron.log(err);
      return false;
    }
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={user}
          onChangeText={text => setUser(text)}
        />
        <SubmitButton onPress={handleSubmit}>
          <Icon name="add" size={20} color="#fff"/>
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar source={{ uri: item.avatar}} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => {}}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
            <RemoveButton onPress={handleRemove}>
              <Icon name="clear" size={20} color="#fff"/>
            </RemoveButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
}
