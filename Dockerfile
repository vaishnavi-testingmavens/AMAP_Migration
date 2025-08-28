# Base image: lightweight and fast
FROM alpine:3.19

# Install required tools (cp, sh, basic shell environment)
RUN apk add --no-cache bash

# Set working directory inside the container
WORKDIR /template

# Copy your entire project into the image
COPY . .

# On container run, copy everything into a mounted host directory (/export)
CMD ["sh", "-c", "cp -r . /export && echo '✅ Framework template copied to host machine at ./export'"]

