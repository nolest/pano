# pano
The center offers clarity, clarity demands terror.

前端安装
/frontend下的npm i
前端dev
/frontend下的npm run dev
前端build
/frontend下的npm run build
*有更新的话前端dist文件夹覆盖即可

后端安装
/server下的npm i
后端dev
/server下的npm run start:dev
后端build
/server下的npm run build
*有更新的话后端dist文件夹覆盖即可

docker部署
根目录Dockerfile，注意5000要跟服务器5000一致
FROM node:16-alpine
WORKDIR /app
WORKDIR /app/server
COPY /server/package*.json /app/server
RUN npm install
COPY . /app
EXPOSE 5000
CMD ["node", "dist/main.js"]

服务器cd到根目录
运行docker服务 
sudo dockerd
sudo systemctl start docker

编译image
进入到前后端目录toServer 执行 docker build -t pano . （注意有个.）
运行docker images 检查镜像
运行docker ps 检查镜像运行状况
运行docker kill [镜像id] 释放端口
运行docker run --publish 5000:5000 pano
完成！

有更新的话docker需要重新执行部署流程