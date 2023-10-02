# Evaluation Assessment

This document describes the evaluation assignment for the position of an HIR in Rebootkamp tunisia. Technologies we use are (but not limited to): React, NodeJS, ExpressJS, MongoDB, MySQL, etc. .

### Techniques:

- MVC architecture.
- Code should follow common software design principles, such as SOLID, DRY, etc.
- 3rd party libraries should be installed with a package manager, like Composer, NPM, Yarn.

### General Info

## What are we assessing:

- Application architecture
- REST API Design skills
- Coding style & quality overall
- Programming patterns

## On theoretical level, we are looking into:

- Communication skills
- Lecturing skills
- Ability to deliver and explain computer science concepts

In general architectural choices are important to us.

## What are we NOT assessing

We do not expect beautiful pages. You should consider that a front-end developer will be giving a hand in an actual team.

## Time

The time you can afford to conclude this assessment is up to 5 hours.
See it as a mini project.

### The Exercise

### A bit of background

The data for a page will be saved in a MySQL database which has a parent-child relation which generates a tree of content to present a page.

As an example:

-- Page

| -- Row[]

| |-- Column[]

| | |-- (Paragraph | Title | Quote | Image)

This is a great structure for organizing your resources and has a good overview and lots of flexibility. Downside is that we lose performance once the tree becomes deeper and deeper.

## The (actual) assignment

### A. REST Service

We need you to create a REST service to CRUD pages and images.
The page can contain containers (for example Row or Column), text and images.
If we try to delete an image we would like to be able to give an alert when an image is being used on a page.

### B. Data

The structure of the repository to accommodate user connections is for you to define.

### C. UI

Give us a way to see your API in action. What we need is a super simple interface to handle the following functionality:

- See the value of a page with some images
- See a list of images
- See a list of pages
- Remove images and get an alert if it’s being used
- Update an image or its description
- The possibility to add an image to the content of a page
- The possibility to show all the images that are used by more than one page
- The possibility to search pages based on their title, paragraph, or quote

Think of a SwaggerUI to prove the point, or a PostMan file.

### Deliverables

In your submission, we would like you to include:

- All code (frontend, backend, any QA assets) developed to create this functionality
- The DB script that generates the structure and the data to run this application

### Bonus Questions

- It’s a big plus if you add (some) tests to your code (let us see your QA skills)
- Looking at the description of the context, please provide architecture diagram(s) on how you would technically design the functionality described for this application in a scalable way. You can decide yourself what types of diagram(s) will help you communicate to us your thoughts about building such an application.
- Which parts of the application would you have implemented differently and why should you have more time?


Best of luck
