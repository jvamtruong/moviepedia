FROM mysql:8.4.3

# Mount the SQL file to the container
COPY backend/data/moviepedia.sql /docker-entrypoint-initdb.d/init.sql
