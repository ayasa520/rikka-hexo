
    hexo cl
    hexo g
    gulp

    cp -f -r public/* ayasa520.github.io 

    cd ayasa520.github.io
    git add .
    git commit -m "更新样式"
    # git push -f git@github.com:ayasa520/hexo.git master:gh-pages

    git push 

    cd ..
    hexo d


# mv  public temp
# mkdir public
# mv  temp public/hexo
# cp -r v_index.html public/index.html
# cd public 
# find . -name ".git" | xargs rm -Rf
# git init 
# git add -A
# git commit -m "vercel"
# cd hexo
# cd..
# git push -f git@github.com:ayasa520/hexo.git  master:vercel


