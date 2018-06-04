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

You can change iOS Simulator by using `--simulator "iPhone X"`.

If you want to run the application on your own phone, follow the directions [here](https://facebook.github.io/react-native/docs/running-on-device.html)

## Make a difference making a different MAD application

We have a simple skeleton for something that could be very cool. We have two screens driven
by tab-based navigation ([react-navigation](https://reactnavigation.org/)),
namely an events screen and a profile screen. We also have an underlying auth and events implementation against the MAD API.

We can log in to the application in the profile screen with our mad.itera.no user.
There, we can see the department we belong to in the company, and we can log out again.

The events screen show all the events we have. You need to log in to see more events.
When you click on an event, you are taken to the JSON payload of that event.

<img src="https://github.com/Hanse/react-native-fagkveld/blob/master/docs/screenshot-1.png" width="200"> <img src="https://github.com/Hanse/react-native-fagkveld/blob/master/docs/screenshot-2.png" width="200"> <img src="https://github.com/Hanse/react-native-fagkveld/blob/master/docs/screenshot-3.png" width="200">

## Tasks

The tasks are listed below in random order. You can start wherever you want. Some tasks are easier than others.

### Sorting events on date

Currently, events are not sorted on date. The upcoming event is shown at the bottom of the list. Sort events in a
suitable place in `Events.js`.

### Improve the event list

The list of events is not really that interesting. It only shows the title of the event. Can you make it more interesting?
Some suggestions are:

- Show date in the event cell
- Show event type in the event cell
- Group the list on date
- Style it differently
- Filter the list on event type (MEETUP or CONFERENCE)
- Add a search bar

Do you have any other suggestions for that page? Implement them!

### Add icons to the tab bar

The tab bar is missing icons. Can you add some relevant icons? Hint: Look [here](https://reactnavigation.org/docs/en/tab-based-navigation.html)
for more information about changing the appearance of the tab bar. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) contains many icons, and you'll also learn to link native libraries.

### Implement the event detail screen

The event detail screen is a JSON dump of the event. We have a lot of information we can use here. We have a description
of the event, a date, event type, public or not, speakers, open for registration etc. Use this information and present it in
a clean way to the end user. Experiment with the [style](https://facebook.github.io/react-native/docs/style.html) and [layout](https://facebook.github.io/react-native/docs/flexbox.html) properties and maybe some of the native components included in React Native listed in the sidebar of [the docs](https://facebook.github.io/react-native/docs/getting-started.html) if it makes sense.

### Change profile

Implement a "Change Profile Screen" where the users can update their profiles.

- Create a new Edit Profile View or change the Profile screen (screens defined in `screens/index.js`)
- Add a couple of [`<TextInput />s`](https://facebook.github.io/react-native/docs/textinput.html) and maybe a [`<Picker />`](https://facebook.github.io/react-native/docs/picker.html) for the department.
- Add a function for dealing with the update profile endpoint in `services/mad.js`.
  - Can be found by inspecting network traffic on [mad.itera.no](https://mad.itera.no) 😃

### Add event to the native calendar

Use [react-native-calendar-events](https://github.com/wmcmahan/react-native-calendar-events) to add events from the MAD
application to your native calendar on the OS.

### Play with the Animated API

There is a <Fade /> component in the components folder that provides a basic fade animation to its children. It is used on the Profile screen. Try changing the animations or add new ones. The [documentation](https://facebook.github.io/react-native/docs/animations.html) covers the Animated API pretty good.
In the [animated-event](https://github.com/Hanse/react-native-fagkveld/tree/animated-event) branch there is an example of using `Animated.event` to animate based on scroll position.

## Other Resources

[awesome-react-native](https://github.com/jondot/awesome-react-native) provides a comprehensive list of React Native resources.
