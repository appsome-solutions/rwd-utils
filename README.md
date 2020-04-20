rwd-utils is a library for easiest window width managing and media styling with react and styled-components.

## Why?
Most of the time you are using some RWD system based on grid or flexbox. 
So if you want to create a 3 column view it will be easy for you, but if you would like to conditionally render component based on window media breakpoints it can be not provided by default in some of UI kits.
That is why we created these utils for conditional breakpoints style changes or rendering changes.
It means you can easily render a button on mobile but hide it on desktop or change its styling due to predefined breakpoints.

## Usage
### RWDProvider

First of all, we need to wrap our app with RWDProvider to inject context for our media and useRWD functionalitites.
```javascript
<RWDProvider>
 ...whole app
</RWDProvider>
```

It can accept `breakpoints` object property which defines our desired app breakpoints we want to track. If we won't define them they will be set as default like here:
```javascript
breakpoints={{
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1600,
}}
```

If we have changed default breakpoints structure we just need to adjust types definition by extending module like:

```typescript
declare module '@appsomesolutions/rwd-utils' {
  type MediaBreakpointsKeys = 'mobile' | 'tablet' | 'desktop';

  export const media: Record<MediaBreakpointsKeys, MediaCss>;

  export const useRWD: () => {
    less: Record<MediaBreakpointsKeys, boolean>;
    more: Record<MediaBreakpointsKeys, boolean>;
    width: number;
  };
}
```

### media.xyz\``

Media is an object which keeps our breakpoints template literals functions to add predefined styles when given breakpoint occurs.
Those breakpoints are mobile-first so styles you have added for mobile will be applied till their behavior will be overriden by biggest breakpoints.
In practice it looks like:

```typescript
import styled from "styled-components";

const MediaTestComponent = styled.h1`
  ${media.xs`
    background-color: blue;
    display: block;
  `}

  ${media.md`
    background-color: red;
    display: block;
  `}

  ${media.xl`
    display: none;
  `}
`;
```

Which will behave like:

![alt text](https://github.com/appsome-solutions/rwd-utils/blob/master/media.gif "screen resized from mobile to desktop, first background color is blue, after reaching mobile breakpoint changes to red, after reaching desktop disappears")

Awesome, isn't it?! 🎉

### useRWD()

useRWD() is a hook that gives us information if given breakpoint is fulfilled or not with `less` than or `more` than an object. Additionaly, we can directly read width value with it.

Like example below shows:

```typescript
const UseRwdTestComponent = () => {
  const { less, more, width } = useRWD();

  return (
    <>
      {less.md && <div> Less than medium </div>}
      {more.md && <div> More than medium </div>}
      <div>{width}</div>
    </>
  );
};
```

Result of such code can be conditionally elements or with displayed in real-time when resized screen:

![alt text](https://github.com/appsome-solutions/rwd-utils/blob/master/useRWD.gif "screen resized from mobile to desktop, less than medium text rendered when the screen is below medium size, more than medium is displayed when scree is above medium width and counter of window width changes dynamically when resizing")

❗ useRWD is a dynamic solution if you plan to create Static Page or SSR read below section

## Server Side Rendering or Static Pages

useRWD is a dynamic solution which means it first needs to load the page, retrieves information about screen size and then it starts to be working.
If you plan to do your site as a Static Page or render it on the server then you won't be able to access `window` property and it will be empty.
That is why if can, try to always use `media.breakpoint`` `   instead of useRWD or definitely say "I won't use SSR or Static Page now and in future".

## Life example
[Code Sandox](https://codesandbox.io/s/appsome-solutionsrwd-utils-udb9m?file=/src/App.tsx)

## Appsome Solutions
All thanks for [Appsome Solutions](https://www.appsome-solutions.com/) - Software Development Company from Poland for sharing their code and knowledge with the community for free ❤
