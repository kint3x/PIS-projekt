FROM icr.io/appcafe/open-liberty:full-java11-openj9-ubi

ARG VERSION=1.0
ARG REVISION=SNAPSHOT

LABEL \
  org.opencontainers.image.url="local" \
  org.opencontainers.image.source="https://github.com/kint3x/PIS-projekt/api" \
  org.opencontainers.image.version="$VERSION" \
  org.opencontainers.image.revision="$REVISION" \
  name="pis_api" \
  version="$VERSION-$REVISION" \
  summary="Container running the REST API interface for the project in PIS course at VUT FIT."

USER root

COPY --chown=1001:0 src/main/liberty/config/server.xml /config/
COPY --chown=1001:0 target/*.war /config/apps/
USER 1001