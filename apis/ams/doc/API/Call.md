# Call API

## Call.fromCondition

Creates a Call object from the condition JSON response of an allowFilterClause request.

* Parameters:

* `condition` ... the condition JSON of the allowFilterClause response
* returns [Call](#call)

## Call.transform

Takes in a transformer function to transform the call object into a String.

* Parameters:

* `call` ... the call object that should be stringified
* `transformFunc` ... a transform function like in the example above
* returns [Call](#call)

## setType

Parameters:

* `type` ... sets the Call type of the Call as String ("and", "or", "in", "eq"...)
* returns this Call Object


## getType

* returns Call type of the Call object

### setArguments

Parameters:

* `args` ... sets the args array of the Call object
* returns this Call Object

## addArgument

Parameters:

* `arg` ... adds one arg to the args array of the Call object
* returns this Call Object

## getArguments

* returns all args

## getArgument

Parameters:

* `index` ... index of argument in args array
* returns the argument at index in the args array

## getArgumentCount

* returns the number of arguments in the args array