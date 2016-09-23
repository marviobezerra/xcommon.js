rmdir /s /q lib
mkdir -p lib\layout
copy package.json lib\
copy scr\layout\xcommon-layout.scss lib\layout\
call tsc