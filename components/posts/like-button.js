import { Button } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { mutate } from "swr";

export default function LikeButton({ post }) {
  const handleLike = () => {
    axios
      .post(
        `https://service.pace-unv.cloud/api/likes/post/${post.id}`,
        {},
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        mutate("https://service.pace-unv.cloud/api/posts?type=all");
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = () => {
    axios
      .post(
        `https://service.pace-unv.cloud/api/unlikes/post/${post.id}`,
        {},
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      )
      .then((res) => {
        mutate("https://service.pace-unv.cloud/api/posts?type=all");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Button
        colorScheme={post?.is_like_post ? "red" : "gray"}
        className="w-full"
        leftIcon={post?.is_like_post ? <FaHeart /> : <FaRegHeart />}
        onClick={post?.is_like_post ? handleDislike : handleLike}
      >
        {post?.likes_count} Like
      </Button>
    </>
  );
}
