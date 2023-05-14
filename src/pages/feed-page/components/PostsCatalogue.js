import PostCard from "./PostCard";

const PostsCatalogue = ({ posts }) => {
  return posts.map((post, ind) => (
    <PostCard key={ind} post = {post} />
  ));
};

export default PostsCatalogue;
