rmdir /s /q lib
mkdir -p lib\style
copy package.json lib\
copy scr\style\xcommon-layout.scss lib\style\
call tsc