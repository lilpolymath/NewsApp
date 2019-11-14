import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const WebViewExample = () => {
  return (
    <View style={styles.container}>
      <WebView source={{uri: 'https://google.com'}} />
    </View>
  );
};
export default WebViewExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
