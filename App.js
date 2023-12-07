import { StatusBar } from 'expo-status-bar';
import { Component, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SockJS from 'sockjs-client'
import Stomp  from 'stompjs'

// export default function App() {
//   useEffect(() => {
//     const ws = new SockJS('http://192.168.252.254:8080/websocket');
//   })

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

class App extends Component{
  state = {
    message: "",
    isMaintanance: false
  }

  setMessage = (value) => {
    this.setState({message: value})
  }

  setisMaintanance = (value) => {
    this.setState({isMaintanance: value})
  }

  onPress = () => {
    console.log(this.state.isMaintanance)
    alert(this.state.isMaintanance? this.state.message : 'Tidak ada maintanance')
  }


  
  constructor(){
    super()

    const socket = new SockJS('http://192.168.252.254:8080/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/public", (payload) => {
        var message = JSON.parse(payload.body);
        console.log(message.isMaintenance)
        this.setMessage(message.message)
        this.setState({isMaintanance: true})
      });
    }, (error) =>{
      setMessage("Could not connect to WebSocket! Please refresh the page and try again or contact your administrator.")
    });
  };

  render(){
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        marginTop: 12,
      }
    });
    return (
          <View style={styles.container}>
            <Text>{this.state.message}</Text>
            <Button
            onPress={this.onPress}
              title="Check"
              type="outline"
              style="styles.button"
            />
            <StatusBar style="auto" />
          </View>
        );
  }
}

export default App