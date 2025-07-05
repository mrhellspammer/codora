# Dockerfile

# Step 1: Use official JDK image
FROM eclipse-temurin:17-jdk-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the built jar file (adjust the jar name if needed)
COPY target/codora-backend-0.0.1-SNAPSHOT.jar app.jar

# Step 4: Expose port 8080
EXPOSE 8080

# Step 5: Set environment variables if needed (optional)
# ENV SPRING_PROFILES_ACTIVE=prod

# Step 6: Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
