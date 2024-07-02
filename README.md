# JavaScript Course Deliveries - Coderhouse

Here is the source code for my deliveries for the JavaScript course at Coderhouse. I developed a task list program where tasks can be added, listed, and deleted.

## First Delivery

The basic logic of the program was created. Through alerts and prompts, the user can access and modify their task list, and user inputs are validated.

## Second Delivery

The code was modified to replace the main menu from a string to an object, improving the code's scalability by allowing menu options to be added and modified, as well as being able to display it in different ways (such as a future graphical interface). The code was also modified to replace the array of task strings with an array of task objects. Each of these objects stores specific properties of the tasks to enrich the information that can be obtained.

## Third Delivery

The code was modified to implement DOM modification through javascript. Propmts where replaced for graphical inputs. I created a js module that contains the class Task to mantain consistency of Task objects accross all the scripts. I also created a js module that contains the class User to maintain consistency accross scripts.

**` Due to this new modules it is recommended to use live server or other local server with module serving capabilities in order to load all the code correctly. `**

I applied the concept of Event Listeners for the submit event on forms, like the login, sign in, and create new task forms. For buttons I assigned the onClick functions in the js code. 

I used the Session Storage to store an authentication parameter, to simulate the login process.

I used the Local Storage to keep track of the user tasks. Right now all the tasks appear on all users, but they will be filtered for the final delivery.
I also used the Local Storage to store the default and custom registered users. This users can be created using the sign in page.

**` For testing purposes there are the following default users, which are created when the login page loads. `**

* **` username: admin, password: admin `**
* **` username: test_user, password: test_password `**

## Contemplated functionalities for the final delivery
In this third delivery a decided to focus on the main functionalities to create an MVP (Minimum Viable Product), applying at least one time the concepts requiered on the assignment

But here is a list of upgrades I have contemplated for the final delivery:

* Apply styles to create a more user-friendly page.
* Filter tasks by user.
* Mark tasks as completed without deleting them.
* Button for cancelling the add new task operation.
* Validate that tasks' titles are unique in order to delete tasks correctly.
* Use the toastify library to notify the user about specific actions.
* Mark tasks as important and visualize them on their own tab.
* Create an specific tab to visualize tasks which due date is today.
