FROM maven:3.9.6-eclipse-temurin-11

WORKDIR /is442-backend
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run