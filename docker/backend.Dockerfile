FROM maven:3.6.0-jdk-11-slim AS build
WORKDIR /app/backend

COPY backend/src /app/backend/src
COPY backend/pom.xml /app/backend
RUN curl 'https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.22/mysql-connector-java-8.0.22.jar' --output '/app/backend/database-connector.jar'

RUN mvn clean package

# ------------------------------------------------------------------------------

FROM payara/micro

WORKDIR /app/backend
EXPOSE 8080

COPY --from=build /app/backend/target/backend-0.0.1-SNAPSHOT.war /app/backend/backend.war
COPY --from=build /app/backend/database-connector.jar /app/backend/database-connector.jar

ENTRYPOINT ["java", "-jar", "/opt/payara/payara-micro.jar", "--addJars", "/app/backend/database-connector.jar", "--deploy", "/app/backend/backend.war"]