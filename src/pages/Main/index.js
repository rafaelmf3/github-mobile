import React, {useState, useEffect} from 'react';
import {Keyboard, ActivityIndicator, AsyncStorage, } from 'react-native';
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
  Followers
} from './styles';

export default function Main(props) {
  const [user, setUser ] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@users').then((users) => {
      if (users === "null") {
        setUsers(users)
      }
    });
  }, []);

  useEffect(()=>{
    AsyncStorage.setItem('@users', JSON.stringify(users));
  }, [users]);

  handleSubmit = async () => {
    setLoading(true);

    api.get(`users/${user}`, {
      timeout: 1000
    }).then((response) => {
      const data ={
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
        followers: response.data.followers,
      }

      const exist = users.findIndex(user => user.name === data.name);
      if (exist === -1) {
        setUsers([...users, data]);
      }

      setLoading(false);
      setUser("");
      Keyboard.dismiss();
    }).catch( function (err){
      setLoading(false);
      return console.tron.log(err.message);
    });


  };

  handleNavigate = () => {
    props.navigation.navigate('User');
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
        <SubmitButton loading={loading} onPress={handleSubmit}>
          { loading ? <ActivityIndicator color="#fff" />: <Icon name="add" size={20} color="#fff"/>}

        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar source={{ uri: item.avatar}} />
            <Name>{item.name}</Name>
            <Followers>{item.followers} Seguidores</Followers>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={handleNavigate}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
}
