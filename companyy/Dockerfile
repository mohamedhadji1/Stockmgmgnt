FROM maven:3.8.4-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
FROM openjdk:17-slim
WORKDIR /app

# Add a spring user to run the application
RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

# Copy the built artifact from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Configure JVM options
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Configure Spring profile
ENV SPRING_PROFILES_ACTIVE=prod

# Expose the port the app runs on
EXPOSE 8081

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8081/actuator/health || exit 1