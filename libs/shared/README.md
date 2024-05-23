# Shared

Contains common shared resources across many packages.

## Use of `UNSAFE` prefix in environment variables

If an environment variable has the `UNSAFE` prefix, it means it can be exposed to users in an unsafe way and security should be considered. For example, it may be used as a value in a client bundle for frontend code and you agree that the information in the environment variable is not sensitive.
