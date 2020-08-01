export const jsQAs = [
  [
    'What is the drawback of using a type of bar ===” object” in order to determine if the bar is an object? What measures would you take to avoid this?',
    'The above statement can be used to check if a bar is an object but this poses the problem that even null will also be considered as the object. So the code will log to true instead of false. So, a better way to do this is to apply a check for the null keyword also.',
  ],
  [
    'Why do we wrap the content of the JS file into a single function block?',
    'This is done in order to create a closure around file contents which creates a private namespace and therefore helps in resolving name clashes between modules and libraries.',
  ],
  [
    'Why do we use “use strict” at the beginning of the JS file?',
    '“use-strict” is a method to enforce strict parsing and error handling at runtime. There could be some code errors that could be ignored but now they will be thrown explicitly.',
  ],
  [
    'What is NaN? How do you intend to test the value if it is equal to NaN?',
    'NaN represents a value which is Not a number. This could be the case when either of the numerator or the denominator value is non-numeric (e.g- abc/6) or maybe because the result of the operation is non-numeric. You can use isNaN() but that is not considered as the most reliable way. Another way would be to use abc! =abc and num.isNaN() which are considered as a more efficient way to test.',
  ],
  [
    'What is a closure in JavaScript?',
    'A closure is referred to as an inner function having access to the variables in the outer function’s scope chain. The closure has accesses to three scoped variables: variables in their own scope, in the function’s scope and global variables',
  ],
  [
    'What is function hoisting?',
    'In JavaScript, functions, and variables are hoisted. The JS interpreter looks forward to finding all the relevant declarations and then hoist them above the function, right where they are declared.',
  ],
];

export const reactQAs = [
  [
    'What is React JS?',
    'React JS is a front end JavaScript library for building web and mobile user interfaces (TK). It was developed by Facebook in 2011. React allows developers to build reusable UI components. It has the support of a large, open source community.',
  ],
  [
    'What are React components? Why are components so important to React?',
    'When it comes to using React, everything boils down to components. Components are the building materials React uses to create website and application UI’s. Components break a UI down into reusable parts (one of React’s core competencies). React then renders each UI component as needed (separately from the others), which is a big part of React’s fast performance speeds.',
  ],
  [
    'What’s the main difference between props and state?',
    '“State” describes a default data value in a React component that can change over time (usually based on user actions that call for changes in a UI). “Props” (or properties) describe the way a React component is configured. Props do not change.',
  ],
  [
    'What are React events?',
    'Events are reactions (the library IS called React, right?) that are triggered by specific user actions like clicking on a UI button, hovering a mouse over a UI object, using keyboard commands with the UI, etc.',
  ],
  [
    'What is JSX?',
    'JSX is an HTML-like syntax that let’s developers write HTML style code in JavaScript, in case you prefer the readability of HTML to raw JavaScript. Developers do NOT need to use JSX to build websites or applications with React, but it can be a helpful tool for reducing overall code complexity (and Facebook encourages using it in their official React documentation).',
  ],
  [
    'What are virtual DOMs and how do they work?',
    'A Virtual DOM is a copy of the site’s “actual” DOM. React uses this copy to determine what parts of the actual DOM need to change based on a user’s action. React takes the change date from the Virtual DOM and selectively updates the actual DOM (versus reloading the entire thing). Over time, this leads to significant performance improvements for the website or application.',
  ],
  [
    'React JS vs React Native—What’s the difference?',
    'React JS is a front end, open source JavaScript library used for building UIs. React Native, on the other hand, is an open source, MOBILE framework that allows developers to use React on platforms like Android and iOS. “Native” is a reference to the fact that React Native integrates React components with the native capabilities of these mobile-specific platforms.',
  ],
  [
    'What are some of the major advantages to using React when building UIs?',
    'Increased application performance via the Virtual DOM model. Improved coding efficiency with JSX. The ability to reuse components across multiple projects. Flexibility and extensibility through add-on tools provided by React’s open source community.',
  ],
  [
    'What is Redux?',
    'Redux helps developers build web applications that perform consistently and are easy to test. It also includes live code editing and debugging tools. Redux can be used with React or any other UI library. React  helps developers divide UIs into multiple components, but doesn’t have a specific way to keep track of state data. Redux  is a library that compliments React by providing a stable way to track this data.',
  ],
  [
    'What are the advantages of Redux?',
    'Redux adds a solid structure to React code, making your code easier to maintain, and your intended coding results more predictable. Redux includes developer tools that allow you to track your web application’s performance in real time – From actions to state changes, developers can track everything going on in the application in real time. Like React, Redux has strong community support and robust ecosystem.',
  ],
];

export const reactNativeQAs = [
  [
    'What is React Native?',
    'React Native is a mobile app development platform that allows you to create android and ios apps only using Javascript. React Native uses the same fundamental UI building blocks as regular iOS and Android apps so applications created using React Native are indistinguishable from an app built using Objective-C or Java.',
  ],
  [
    'List some core components of React Native?',
    'Text, Image, View, TextInput, ListView',
  ],
  [
    'What is FlexBox in React Native?',
    'Flexbox in React Native works in the same way as it does in CSS on the web, with a few exceptions. It is used to provide a consistent layout on different screen sizes.',
  ],
  [
    'What is use of FlatList in React Native?',
    'FlatList in React Native is a component that displays the content in similarly structured data as a scrollable list. It is used for large lists of data where the number of list items changes over time.',
  ],
  [
    'What does StyleSheet.create do in React Native?',
    'StyleSheet.create method ensures that values are immutable and opaque, they are also only created once.',
  ],
  [
    'Can we combine native ios and android code in React Native?',
    'Yes, we can. React Native smoothly combines the components written in Objective-C, Java, or Swift.',
  ],
  [
    'What is use of platform module in React Native',
    'React Native Platform module is used to detect the platform of device in which the application is running.',
  ],
];
