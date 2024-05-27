# Why Zod??

You might be thinking why it's worth the hassle writing zod schemas in addition to the mongoose schemas.

The reason is mongoose only goes so far before it gives up on types. For example, with discriminated documents, you need to explicitly pass in a generic to retain the strong typings.

I thought I might as well create my TS types from zod schemas, and if it's ever needed, you can use the schemas in the application if you want to do some extra validation. So it gives two solutions for one problem!

Downside of course is some extra boilerplate. But there will only be a handful of collections.
