import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  LoginButton, 
  AccessToken
} from 'react-native-fbsdk';

const {width} = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props);
    const {state} = this.props.navigation;
    this.state = {
      isLoading: true,
      apiURL: 'https://www.journeymission.me/api'
    };
  }

  sendVar(team) {
    const variable = {
      id: this.state.id,
      fbId: this.state.fbId,
      apiURL: this.state.apiURL,
      accessToken: this.state.accessToken,
      score: this.state.score,
      name: this.state.name
    };
    if (team !== 0) {
      if (team === 'fox') {
        variable['team'] = 'fox';
      } else {
        variable['team'] = 'bear';
      }
    }
    return variable;
  }
  addProfile(pid, name, email, accessToken) {
    let URL = this.state.apiURL + '/Profiles?Profile_ProviderID=' + pid + '&Profile_Name=' + name + '&Profile_Email=' + email + '&Profile_AccessToken=' + accessToken;
    console.log(URL);
    const { navigate } = this.props.navigation;
    fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({isLoading: true});
      navigate('SelectTeam', this.sendVar(0));
    }).catch((error) => {
      console.error(error);
    });
  }

  addAccessToken(accessToken, id) {
    let URL = this.state.apiURL + '/Profiles/' + id + '?Profile_AccessToken=' + accessToken;
    console.log(URL);
    const {navigate} = this.props.navigation;
    fetch(URL, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: false
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        this.loginWithFb(data.accessToken);
      } 
    ).catch(() => {
      this.setState({
        isLoading: false,
      });
    });
  }
  checkProfile(pid, name, email, accessToken) {
    let URL = this.state.apiURL + '/Profiles?search=Profile_ProviderID:' + pid;
    console.log(URL);
    const { navigate } = this.props.navigation;
    fetch(URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      this.setState({
        isLoading: true,
        id: responseJson.data[0].id,
        name: responseJson.data[0].Profile_Name,
        fbId: responseJson.data[0].Profile_ProviderID,
        accessToken: responseJson.data[0].Profile_AcessToken,
        score: responseJson.data[0].Profile_Score,
      });
      if (responseJson.data.length === 0) {
        this.addProfile(pid, name, email, accessToken);
      } else {
        if (responseJson.data[0].Profile_AccessToken !== accessToken) {
          this.addAccessToken(accessToken, responseJson.data[0].id);
        }
        if (responseJson.data[0].Profile_Team != null) {
          navigate('Home', this.sendVar(responseJson.data[0].Profile_Team));
        } else {
          navigate('SelectTeam', this.sendVar(0));
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  loginWithFb(accessToken) {
    fetch('https://graph.facebook.com/v2.10/me?fields=id,name,email&access_token=' + accessToken).then((response) => response.json()).then((json) => {
      this.setState({isLoading: true, accessToken: accessToken});
      this.checkProfile(json.id, json.name, json.email, accessToken);
    }).catch((error) => {
      alert('ERROR GETTING DATA FROM FACEBOOK')
      console.log(error);
    })
  }
  render() {
    if (this.state.isLoading) {
      return(
      <View style={styles.container}>
        <Image style={styles.letgo} source={require('../img/letgo.png')}/>
        <ActivityIndicator />
      </View>
      );
    }else{
      
    return (
      <View style={styles.container}>
        <Image style={styles.letgo} source={require('../img/letgo.png')}/>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={(error, result) => {
          if (error) {
            alert("login has error: " + result.error);
          } else if (result.isCancelled) {
            alert("login is cancelled.");
          } else {
            AccessToken
              .getCurrentAccessToken()
              .then((data) => {
                this.setState({
                  isLoading: true,
                });
                this.loginWithFb(data.accessToken.toString());
              })
          }
        }}
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
    
  }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBD54A'
  },
  letgo: {
    width: width * 0.5,
    height: (width * 0.5) + 50,
    resizeMode: 'contain'
  },
});

AppRegistry.registerComponent('Login', () => Login);
