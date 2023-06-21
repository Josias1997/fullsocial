import axios from "axios";
import axiosInstance from "../config/axiosInstance";

const headers = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getUserFeed = async (userId: string | number, token: string) => {
  return await axiosInstance.get(`/user/feed/${userId}`, headers(token));
};

export const getUserImages = async (
  userId: string | number,
  token: string,
  page = 1,
  count = 9
) => {
  return await axiosInstance.get(
    `/user/images/${userId}/${page}/${count}`,
    headers(token)
  );
};

export const getUserPosts = async (userId: string | number, token: string) => {
  return await axiosInstance.get(`/user/posts/${userId}`, headers(token));
};

export const getUserFollowers = async (
  userId: string | number,
  token: string
) => {
  return await axiosInstance.get(`/user/followers/${userId}`, headers(token));
};

export const getUserFollowings = async (
  userId: string | number,
  token: string
) => {
  return await axiosInstance.get(`/user/followings/${userId}`, headers(token));
};

export const updateUserProfileImage = async (
  userId: string | number,
  token: string,
  formData: FormData
) => {
  return await axiosInstance.post(
    `/user/update/profile-image/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        mimeType: "multipart/form-data",
      },
    }
  );
};

export const updateUserCoverImage = async (
  userId: string | number,
  token: string,
  formData: FormData
) => {
  return await axiosInstance.post(
    `/user/update/cover-image/${userId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        mimeType: "multipart/form-data",
      },
    }
  );
};

export const findUsersBy = async (
  userId: string | number,
  query: string,
  page = 1,
  token: string
) => {
  return await axiosInstance.get(
    `/search/users/${userId}/${query}/${page}`,
    headers(token)
  );
};

export const findUserById = async (userId: string | number, token: string) => {
  return await axiosInstance.get(`/users/${userId}`, headers(token));
};

export const followOrUnfollowUser = async (
  userId: string | number,
  friendId: string | number,
  type: string,
  token: string
) => {
  return await axiosInstance.post(
    `/users/follow`,
    { user_id: userId, friend_id: friendId, type },
    headers(token)
  );
};

export const verifyFriendship = async (
  userId: string | number,
  friendId: string | number,
  token: string
) => {
  return await axiosInstance.get(
    `/users/verify-friendship/${userId}/${friendId}`,
    headers(token)
  );
};

export const getUserFriendsStories = async (
  userId: string | number,
  token: string
) => {
  return await axiosInstance.get(
    `/users/${userId}/friends/stories`,
    headers(token)
  );
};
