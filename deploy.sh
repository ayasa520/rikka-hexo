 #!/bin/bash
cd /var/hexo_source/hexo
git pull>log.txt
hexo clean>>log.txt
hexo generate>>log.txt
gulp>>log.txt