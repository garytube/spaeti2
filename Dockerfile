# Stage 1: Build the SvelteKit app with Bun
FROM oven/bun AS sveltekit-builder

# Set the working directory in the container
WORKDIR /app

# Copy all the application files to the container
COPY ./frontend .

# Install dependencies and build the app
RUN bun install
RUN bun run build

# Stage 2: Download and prepare PocketBase
FROM alpine:latest AS pocketbase-prep

ARG PB_VERSION=0.22.4

# Install required packages
RUN apk add --no-cache \
  unzip \
  ca-certificates

# Download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb

# Final stage: Assemble the SvelteKit static files and PocketBase into a single image
FROM alpine:latest

# Metadata labels
LABEL maintainer="g@geryy.dev"
LABEL version="1.0"
LABEL description="A Speati made with SvelteKit and PocketBase"
LABEL org.opencontainers.image.source https://github.com/garytube/spaeti2
LABEL org.opencontainers.image.description "A Speati made with SvelteKit and PocketBase"

# Copy the PocketBase binary from the pocketbase-prep stage
COPY --from=pocketbase-prep /pb/pocketbase /pb/pocketbase

# Copy the built SvelteKit app from the sveltekit-builder stage
COPY --from=sveltekit-builder /app/dist /pb/pb_public

EXPOSE 8090

CMD ["/pb/pocketbase", "serve", "--dev", "--http=0.0.0.0:8090"]
