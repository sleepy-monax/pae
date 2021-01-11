FROM mysql

COPY ./database/* /docker-entrypoint-initdb.d/