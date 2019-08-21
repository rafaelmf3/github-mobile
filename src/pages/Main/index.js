import React, {useState, useEffect} from 'react';
import {Keyboard, ActivityIndicator, AsyncStorage} from 'react-native';
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
  ProfileButtonText
} from './styles';

export default function Main() {
  const [user, setUser ] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@users').then((users) => {
      if (users === "null") {
        setUsers(users)
      }
    });
    console.tron.log("useEffect inicial");
  }, []);

  useEffect(()=>{
    //AsyncStorage.setItem('@users', JSON.stringify(users));
    console.tron.log(users);
    console.tron.log("useEffect quando muda users");

  }, [users]);

  handleSubmit = async () => {
    setLoading(true);

    const response = await api.get(`users/${user}`);

    const data ={
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    }

    const exist = users.findIndex(user => user.name === data.name);
    console.tron.log(exist);
    if (exist === -1) {
      setUsers([...users, data]);
    }

    setLoading(false);

    Keyboard.dismiss();
  };

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
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={ () => {}}>
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
