FROM maven:3.9.6-eclipse-temurin-21

WORKDIR /is442-backend
COPY ./backend .
COPY ./unsplashImages ./src/main/resources/unsplashImages
RUN mvn clean install

CMD mvn spring-boot:run