FROM icr.io/appcafe/open-liberty:full-java11-openj9-ubi

USER root

WORKDIR /opt/

RUN curl https://dlcdn.apache.org/maven/maven-3/3.9.1/binaries/apache-maven-3.9.1-bin.tar.gz -o apache-maven-3.9.1-bin.tar.gz; \
    tar xzf apache-maven-3.9.1-bin.tar.gz; \
    ln -s apache-maven-3.9.1 maven; \
    rm -f apache-maven-3.9.1-bin.tar.gz

ENV M2_HOME=/opt/maven
ENV PATH=${M2_HOME}/bin:${PATH}

WORKDIR /opt/api

CMD ["mvn", "clean", "liberty:dev"]
