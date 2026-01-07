# stage 1: build backend (so we do not depend that a local build was run before)
FROM eclipse-temurin:25 AS builder

WORKDIR /app

# copy gradle-relevant files
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# make gradle wrapper exectuable
RUN chmod +x gradlew

# cache dependencies
RUN ./gradlew dependencies --no-daemon

# copy src code
COPY src src

# build the backend-app
RUN ./gradlew build --no-daemon

# stage 2: runtime
FROM eclipse-temurin:25

# create a non-root user
RUN groupadd -r nonroot && useradd -r -g nonroot nonroot
USER nonroot:nonroot

WORKDIR /app

# copy the JAR created in the first stage
COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]