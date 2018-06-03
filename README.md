# react-native-fagkveld

Make a difference making a different application

## Get started
- Be on [`node`](https://nodejs.org/en/) > version 8 and have [`yarn`](https://yarnpkg.com/lang/en/) installed
- Follow the Getting Started guide in the React Native [documentation](https://facebook.github.io/react-native/docs/getting-started.html)
    - Click on "Building Projects with Native Code"
    - Choose the correct "Development OS" and "Target OS"
    - Follow the steps you need to follow until you get to "Creating a new application"
    
## Get the code and run the app
- Clone this repository
- Run `yarn` from your command line and then run `yarn start`
- Run `yarn ios` for iOS or run `yarn android` for Android in a new shell

If you want to run the application on your own phone, follow the directions [here](https://facebook.github.io/react-native/docs/running-on-device.html)
    
## Make a difference making a different MAD application
We have a simple skeleton for something that could be very cool. We have two screens driven
by tab-based navigation ([react-navigation](https://reactnavigation.org/)),
namely an events screen and a profile screen. We also have an underlying auth and events implementation against the MAD API.

We can log in to the application in the profile screen with our mad.itera.no user.
There, we can see the department we belong to in the company, and we can log out again.

The events screen show all the events we have. You need to log in to see more events.
When you click on an event, you are taken to the JSON payload of that event.

### Tasks
The tasks are listed below in random order. You can start wherever you want. Some tasks are easier than others.

#### Sorting events on date
Currently, events are not sorted on date. The upcoming event is shown at the bottom of the list. Sort events in a
suitable place in `Events.js`.

#### Improve the event list 
The list of events is not really that interesting. It only shows the title of the event. Can you make it more interesting?
Some suggestions are: 

- Show date in the event cell
- Show event type in the event cell
- Group the list on date
- Style it differently 
- Filter the list on event type (MEETUP or CONFERENCE)

Do you have any other suggestions for that page? Implement them!

#### Add icons to the tab bar
The tab bar is missing icons. Can you add some relevant icons? Hint: Look [here](https://reactnavigation.org/docs/en/tab-based-navigation.html)
for more information about changing the appearance of the tab bar.

#### Implement the event detail screen
The event detail screen is a JSON dump of the event. We have a lot of information we can use here. We have a description
of the event, a date, event type, public or not, speakers, open for registration etc. Use this information and present it in
a clean way to the end user.

#### Add event to the native calendar 
Use [react-native-calendar-events](https://github.com/wmcmahan/react-native-calendar-events) to add events from the MAD
application to your native calendar on the OS. 
