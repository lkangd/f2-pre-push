# f2-pre-push
F2 branch auto merge git pre-push hook for yunke~.

## Install
```bash
npm i -g f2-pre-push
```

## Use
```bash
# cd into your project directory
cd ~/code/bff-aicard-mp

# inject f2 branch auto merge mater branch pre push hook into “.git/hooks/pre-push”
f2-pre-push e

# and then, when you push f2-* branch in orgin/f2-*，the pre-push hook will fetch origin/master branch and merge the lastest master into your current f2 branch
git checkout f2-xxxxxxxx-some-desc
git push
```

## Disable
```bash
# you can use "f2-pre-push d" command line to disable this pre-push hook at any time.
# cd into your project directory
cd ~/code/bff-aicard-mp

# then
f2-pre-push d

# all done
```
