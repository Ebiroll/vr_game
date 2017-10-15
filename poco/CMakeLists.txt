cmake_minimum_required(VERSION 3.7)
project(websocket)

set(CMAKE_CXX_STANDARD 11)

set(SERVER_SOURCE_FILES WebSocketServer.cpp)


# External libs
find_package(Poco REQUIRED Util Net)

# Targets
add_executable(server ${SERVER_SOURCE_FILES})

target_link_libraries(server ${Poco_LIBRARIES})

