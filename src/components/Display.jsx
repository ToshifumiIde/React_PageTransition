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
        {/* 面談日時{new Date({interviewDay}?.toDate()).getFullYear()} */}
        {startTime}〜{finishedTime}
      </span>
    </div>
  );
};
