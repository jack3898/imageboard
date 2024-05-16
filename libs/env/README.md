# Env

Contains common schemas for environment variable values. Used for parsing of environment variables.

## Use of `UNSAFE` prefix

If an environment variable has the `UNSAFE` prefix, it means it can be exposed to users in an unsafe way and security should be considered. For example, it may be used as a value in a client bundle for frontend code and you agree that the information in the environment variable is not sensitive.
