import React, {Component} from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-elements';
import {WebView} from 'react-native-webview';
import moment from 'moment';
import WebViewExample from '../Webview';

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {openWebview: false};
  }

  onPressCard = () => {
    this.setState({openWebview: true});
  };

  render() {
    const {
      title,
      description,
      url,
      publishedAt,
      urlToImage,
      source,
    } = this.props.article;

    const {noteStyle, featuredTitleStyle, infoSection, container} = styles;
    const time = moment(publishedAt || moment.now()).fromNow();
    ('https://dev.to/codeitbro/android-webview-example-to-convert-a-blog-into-an-android-app-20l2');
    const defaultImg =
      'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';

    return this.state.openWebview ? <WebViewExample /> : <WebViewExample />;
  }
}

const styles = StyleSheet.create({
  featuredTitleStyle: {
    marginHorizontal: 15,
    textShadowColor: '#d3d3d3',
    textShadowRadius: 3,
  },
  noteStyle: {
    margin: 5,
    fontStyle: 'italic',
    color: '#000000',
    fontSize: 12,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#d3d3d3',
  },
});
