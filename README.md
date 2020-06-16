### Для запуска backend и frontend необходимо выполнить несколько шагов.

1) Запустить докер образ с mongo db, либо поменять в папке backend *.env* файл с другими данными, для подключения: 
`` docker-compose up -d``

2) Установить зависимости frontend\backend, к примеру на linux через yarn.
`` cd ./frontend/ && yarn install ``, `` cd ../backend/ && yarn install``

3) Для запуска frontend ``yarn start``. 

4) Backend желательно запускать через команду: `` yarn start:dev ``, так будет доступен playground и дополнительно логгер будет писать помимо файла в консоль процесса.



