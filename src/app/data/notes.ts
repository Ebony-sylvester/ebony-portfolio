// Short posts shown in the Notes window. Plain paragraphs keep them easy to
// write; a line starting with "## " becomes a subheading.

export interface Note {
  id: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
}

export const NOTES: Note[] = [
  {
    id: 'angular-from-react',
    title: 'Learning Angular as a React developer',
    date: 'November 2026',
    summary: 'What carried over from React, what didn’t, and two bugs that taught me the most.',
    body: [
      'I built this portfolio in Angular on purpose. I work in React and React Native every day, and I wanted to learn the other framework a lot of teams hire for by shipping something real instead of following a tutorial.',
      '## What carried over',
      'More than I expected. Angular’s signals feel a lot like React state: `signal()` is close to `useState`, and `computed()` is `useMemo` without the dependency array, because Angular tracks what you read. Components are standalone now, so there are no modules to wire up, and the new `@if` and `@for` blocks read like JSX conditionals and maps.',
      '## What was different',
      'Templates are HTML with bindings, not JavaScript, so logic lives in the class and the template stays declarative. Dependency injection replaced the context providers I would reach for in React: the window manager on this desktop is a single service that any window can inject.',
      '## Two bugs worth remembering',
      'First, I read a component input in the constructor and the page went blank. In Angular, inputs aren’t set yet when the constructor runs. The fix was `linkedSignal`, which derives a value from the input and still lets me override it later.',
      'Second, the terminal sometimes kept old text after you pressed Enter. The input’s value was bound to a signal, and clearing it went from an empty string to an empty string, so Angular saw no change and never touched the DOM. Clearing the element directly fixed it. Both bugs came down to knowing when the framework actually looks at your data.',
    ],
  },
  {
    id: 'error-messages-mid-task',
    title: 'Writing error messages for people mid-task',
    date: 'November 2026',
    summary: 'Lessons from the AI photo checks in the Keepers cleaner app.',
    body: [
      'In the Keepers cleaner app, cleaners photograph each room and an AI reviewer checks the photo against a reference. When a photo fails, the person reading the message is standing in a bathroom with a mop, not sitting at a desk. That changes how you write.',
      '## Say what to do, not what broke',
      'A reason like "wrong room" is only useful if the next step is obvious. The retake flow puts the reason and the fix together, so the cleaner knows exactly what to photograph next.',
      '## Show that something is happening',
      'An AI check takes a moment. A clear "Checking photo" state stops people from tapping again or assuming the app froze.',
      '## Write it in their language',
      'Many cleaners don’t use English first, so the failure reasons and the retake flow work in English, Spanish and Portuguese. Translation isn’t a final polish step; it changes how short and plain the original message has to be.',
      '## Make the camera help',
      'The best error is one that never happens. Rebuilding the camera with the reference photo’s orientation and an adjustable on-screen guide meant more photos lined up correctly the first time. Together, these changes helped lift the clean-room pass rate from 52% to 92% while the reviewer still blocked 98% of bad photos.',
    ],
  },
];
