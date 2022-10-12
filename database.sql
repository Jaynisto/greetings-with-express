create database my_tests;
create role fanie login password 'Jnisto9801';
grant all privileges on database my_tests to fanie;

create table Greeted_Users(
    userID SERIAL PRIMARY KEY,
    userName varchar(100),
    greetedCount INT
);