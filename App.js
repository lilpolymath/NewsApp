/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-elements';
import moment from 'moment';
import {getNews} from './src/news';
import WebViewExample from './src/Webview';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {openWebView: false, link: '', articles: [], refreshing: true};
    this.fetchNews = this.fetchNews.bind(this);
    this.handleView = this.handleView.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  handleView = url => {
    this.setState({
      openWebView: true,
      link: url,
    });
  };

  fetchNews = () => {
    getNews()
      .then(articles => this.setState({articles: articles, refreshing: false}))
      .catch(() => this.setState({refreshing: false}));
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => this.fetchNews(),
    );
  };

  render() {
    const {link} = this.state;
    return this.state.openWebView ? (
      <WebViewExample url={link} />
    ) : (
      <FlatList
        data={this.state.articles}
        renderItem={({item}) => (
          <RenderRow
            title={item.title}
            description={item.description}
            url={item.url}
            publishedAt={item.publishedAt}
            urlToImage={item.urlToImage}
            source={item.source}
            handleView={this.handleView}
          />
        )}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
    );
  }
}

function RenderRow({
  title,
  description,
  url,
  publishedAt,
  urlToImage,
  source,
  handleView,
}) {
  const time = moment(publishedAt || moment.now()).fromNow();
  const defaultImg =
    'https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Images-HD-Diamond-Pattern-PIC-WPB009691.jpg';
  return (
    <View>
      <TouchableOpacity onPress={() => handleView(url)}>
        <Card
          featuredTitle={title}
          featuredTitleStyle={styles.featuredTitleStyle}
          image={{uri: urlToImage || defaultImg}}>
          <Text style={{marginBottom: 5}}>{description || 'Read more...'}</Text>
          <Divider style={{backgroundColor: '#dfe6e9'}} />
          <View style={styles.infoSection}>
            <Text style={styles.noteStyle}>{source.name.toUpperCase()}</Text>
            <Text style={styles.noteStyle}>{time}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
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
});
