#!/bin/sh

# 获取当前分支名
branch_name=`git symbolic-ref --short -q HEAD`
# 判断是否 f2 分支
if [[ $branch_name == f2* ]]
then
  # 拉取最新的 master 分支
  git pull origin master
  # 合并 master 到当前 f2
  merge_master_result=`git merge master`
  echo 'merge result: '$merge_master_result
  # 判断合并结果
  if [[ $merge_master_result == 'Already up to date.'* ]]
  then
    # 提示合并结果
    echo 'f2 branch '$branch_name' auto merge success！'
  else
    # 合并异常退出
    echo 'Your current f2 branch is not up to date, please merge master branch to current branch and push again.'
    exit 1
  fi
fi