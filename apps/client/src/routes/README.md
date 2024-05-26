# Routes

This application uses auto-generated file-based routing using Tanstack Router.

Please see https://tanstack.com/router/v1/docs/framework/react/guide/file-based-routing#file-naming-conventions for more information about it.

## Note

Route components should be **simple**. Complex components should be isolated and placed in the `common` components directory. They should be written in a way where they can be plugged in to anywhere.

Route components should provide core layout, element container styling with basic components like headers or small bits of page-specific text.

Some advantages of this approach:

- You do not need to remember what route file a piece of functionality is in.
- Forces state to be isolated and calculated lower down in the component tree leading to more optimised rerenders. Using tools like Zustand, this reduces prop drilling while being fast.
- De-clutters route components.
- "Common" components are not intended to be reused in different apps, so you can really go crazy with app specific state. If you think it should be portable to different applications then put it in `atom`.
