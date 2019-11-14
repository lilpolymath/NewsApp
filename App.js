/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {getNews} from './src/news';
import Article from './src/components/Articles';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {articles: [], refreshing: true};
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

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
    return (
      <FlatList
        data={this.state.articles}
        renderItem={({item}) => <Article article={item} />}
        keyExtractor={item => item.url}
        refreshing={this.state.refreshing}
        onRefresh={this.handleRefresh.bind(this)}
      />
    );
  }
}

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';

// import {WebView} from 'react-native-webview';

// const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <WebView
//           style={styles.webview}
//           source={{uri: 'https://www.slack.com'}}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           startInLoadingState={false}
//           scalesPageToFit={true}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   webview: {
//     flex: 1,
//     backgroundColor: 'yellow',
//     width: deviceWidth,
//     height: deviceHeight,
//   },
// });
