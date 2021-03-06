import React, { Component } from 'react';
import { connect } from 'react-redux';
import { objectToArray } from '../helpers/functions';
import Post from './Post';
import CategoryTitle from './CategoryTitle';
import PostOrderTabs from './PostOrderTabs';
import NewPostButton from './NewPostButton';
import { fetchAllPosts } from '../actions/posts';

/**
 * @description Renders a list of posts from any or a selected category. 
 * @extends React.Component.
 * @param {object} props An object with: a number key that indicates the order criteria (1 for top rated first, 
 * 2 for most recent first) and a boolean that determines wheter the viewport is mobile or not.
 */
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderKey: 1,
      isMobile: false
    }
    this.updateIsMobile.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllPosts();
    this.updateIsMobile();
    window.addEventListener("resize", this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateIsMobile);
  }

  updateIsMobile = () => {
    this.setState({ isMobile: window.innerWidth < 768 })
  }

  handleSelect = (showOrderKey) => {
    this.setState({
      showOrderKey
    });
  }

  render() {
    let { posts } = this.props;
    const category = this.props.match.params.category ? this.props.match.params.category : '';
    if (this.state.showOrderKey === 1) posts = posts.sort((a, b) => b.voteScore - a.voteScore);
    else posts = posts.sort((a, b) => b.timestamp - a.timestamp);
    return <div>
      <CategoryTitle category={category} >
        <PostOrderTabs showOrderKey={this.state.showOrderKey} handleSelect={this.handleSelect} />
        {!this.state.isMobile && <NewPostButton category={this.props.match.params.category || ''} />}
      </CategoryTitle>
      <br />
      <div className="posts-list-body">
        {posts.map((post, i) =>
          <Post key={i} {...post} />
        )}
      </div>
    </div>
  }
}

const mapStateToProps = ({ posts }, ownProps) => {
  let postList = objectToArray(posts.byId);
  if (ownProps.match.params.category)
    postList = postList.filter(p => (p.category === ownProps.match.params.category && p.deleted === false));
  return {
    posts: postList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);