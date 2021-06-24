 #!/bin/bash
 cd /var/hexo_source/hexo
git pull
hexo clean
hexo generate
gulp