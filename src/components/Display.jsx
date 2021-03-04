import React from "react";

export const Display = ({
  key,
  user,
  interviewee,
  title,
  content,
  startTime,
  finishedTime,
  interviewDay,
}) => {
  return (
    <div>
      <span>{key}</span>
      <span>担当@{user}</span>
      <span>面談者：{interviewee}</span>
      <span>面談タイトル：{title}</span>
      <span>面談内容：{content}</span>
      <span>
        面談日時：{new Date(interviewDay?.toDate()).getFullYear()}年{" "}
        {("0" + (new Date(interviewDay?.toDate()).getMonth() + 1)).slice(-2)}月{" "}
        {("0" + new Date(interviewDay?.toDate()).getDate()).slice(-2)}日{" "}
        {startTime}〜{finishedTime}
      </span>
    </div>
  );
};
