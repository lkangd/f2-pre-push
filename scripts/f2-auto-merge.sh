#!/bin/sh

# 获取当前分支名
branch_name=`git symbolic-ref --short -q HEAD`
# 判断是否 f2 分支
if [[ $branch_name == f2* ]]
then
  # 拉取最新的 master 分支
  git fetch origin master:master
  # 检查当前分支是否合并过最新的 master 分支
  check_merge_status=`git branch --merge ${branch_name} | grep ' master'`
  # 是则继续推送
  if [[ $check_merge_status == *' master'* ]]
  then
    echo -e '\033[32m Your current f2 branch is up to date with master. \033[0m'
    exit 0
  else
    # 否则进行 merge master
    merge_master_result=`git merge master`
    if [[ $merge_master_result == *'Updating'* ]]
    then
      # 合并正常
      echo -e '\033[34m Your current f2 branch is up to date with master, please push again.  \033[0m'
    else
      # 合并异常
      echo -e '\033[33m Your current f2 branch is not up to date with master, please merge master branch to current branch and push again. \033[0m'
    fi
    exit 1
  fi
fi