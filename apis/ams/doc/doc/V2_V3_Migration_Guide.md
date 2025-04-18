# V2 -> V3 Migration guide

To migrate from `@sap/ams 2` to `@sap/ams 3`, you should not have to make any changes if your project is a CAP project.
If it is not and you are using the `Attributes` and `PolicyDecisionPoint` classes, you need to switch to a new API as those classes have been removed.

We are not aware of consumers that rely on the old non-CAP API.
If you own a productive system that is affected by this migration and you cannot migrate alone based on the new documentation, please contact us via the official support channels to reach out for help.