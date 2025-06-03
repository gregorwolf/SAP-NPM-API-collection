## Code Formatting

CDS-LSP provides a functionality called _code formatting,_ also known as _beautify._
Code formatting alters whitespaces and line breaks in existing CDS code to follow
a unified code style and to aid the eye reading the code.

Code formatting can be triggered by means of the `textDocument/formatting` LSP request or, when using CDS-LSP via editors such as VSCode, through
the corresponding commands such as _format document_ or _format highlighted section._

### Formatting Options

CDS-LSP provides a comprehensive set of options to adjust fine details of code formatting.
The options are classified in several categories.

#### Parent options and child options

Some formatting options are assigned a _parent option_ that allows to enable or disable a subset of semantically related _child options_ at once.

_Disabling_ a parent option also disables the child options.

_Enabling_ a parent option restores the previous state of all its child options.
When a parent option is enabled, its child option can be either enabled or disabled.

#### Available options

An overview of available options is given in what follows.

| Option Key                           | Default Value | Description                                                                                                                                    | Parent Option                 |
|--------------------------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| alignAfterKey                        | true          | Align _element identifiers_ and `select` items after optional `key` keyword                                                                    |                               |
| alignAnnotations                     | true          | Align _annotations_                                                                                                                            |                               |
| alignPreAnnotations                  | true          | Align annotations before items. If multiple annotations exist in a line, they are aligned in a tabular way                                     | alignAnnotations              |
| alignPostAnnotations                 | true          | Align annotations after items                                                                                                                  | alignAnnotations              |
| alignColonsInAnnotations             | true          | Align _colons_ in annotations                                                                                                                  | alignAnnotations              |
| alignValuesInAnnotations             | true          | Align _values_ in annotations                                                                                                                  | alignAnnotations              |
| alignActionsAndFunctions             | true          | Align parts of _actions_ and _functions_                                                                                                       |                               |
| alignActionNames                     | true          | Align the names of _functions_ and _actions_                                                                                                   | alignActionsAndFunctions      |
| alignActionReturns                   | true          | Align the `returns` keyword of _actions_ and _functions_                                                                                       | alignActionsAndFunctions      |
| alignAs                              | true          | Align the `as` keyword                                                                                                                         |                               |
| alignAsInEntities                    | true          | Align the `as` keyword in entities. Alignment scope: encompassing context                                                                      | alignAs                       |
| alignAsInSelectItems                 | true          | Align the `as` keyword in entity `select` items                                                                                                | alignAs                       |
| alignAsInUsing                       | true          | Align the `as` keyword in `using` statements                                                                                                   | alignAs                       |
| alignExpressionsAndConditions        | true          | Align parts of _expressions_ and _conditions_, including left- and right-hand side and operator                                                |                               |
| alignExprAndCondWithinBlock          | true          | Align parts of _expressions_ and _conditions_ within the encompassing block rather than throughout the whole statement                         | alignExpressionsAndConditions |
| alignTypes                           | true          | Align _element types_ within entities, type or annotation specifications                                                                       |                               |
| alignColonsBeforeTypes               | true          | Align _colons_ before element types                                                                                                            | alignTypes                    |
| alignEqualsAfterTypes                | true          | Align _assignment operators_ `=` after element types                                                                                           | alignTypes                    |
| alignTypesWithinBlock                | true          | Align _element types_ (and _colons_) within the encompassing block rather than throughout the whole statement                                  | alignTypes                    |
| alignCompositionStructToRight        | true          | Align _struct_ defined in `composition` to the right                                                                                           | alignTypes                    |
| boolOpsAtLineEnd                     | false         | Position `and`, `or` operators at line end                                                                                                     |                               |
| cqlKeywordCapitalization             | lower         | How _CQL keywords_ are capitalized                                                                                                             |                               |
| keepPreAnnotationsInOriginalLine     | keepLine      | Either keeps the line structure of _pre-annotations_ or wraps each annotation in separate line                                                 |                               |
| keepPostAnnotationsInOriginalLine    | keepLine      | Either keeps the line structure of _post-annotations_ or wraps each annotation in separate line                                                |                               |
| keepEmptyBracketsTogether            | true          | Keep empty _brackets_ `[] ()` in the same line rather than allowing line breaks between them                                                   |                               |
| keepSingleLinedBlocksTogether        | true          | Avoid single-lined _blocks_ of the same type being separated by empty lines                                                                    |                               |
| keepOriginalEmptyLines               | true          | Prevent deletion of consecutive empty lines below the limit. If disabled, allow consecutive empty lines to be removed depending on the context |                               |
| maxKeepEmptyLines                    | 2             | Maximum number of consecutive _empty lines_ to keep. Empty lines below this limit may still be removed depending on other settings             |                               |
| openingBraceInNewLine                | false         | Wrap line before opening _brace_                                                                                                               |                               |
| selectInNewLine                      | true          | Start `select` statement of entity or view definition in a new line (indented)                                                                 |                               |
| tabSize                              | 2             | Specify the number of spaces per indentation level                                                                                             |                               |
| finalNewline                         | true          | Insert newline character at the end of the file                                                                                                |                               |
| formatDocComments                    | false         | Enable to format markdown in doc comments, e.g. align tables, renumber lists etc.                                                              |                               |
| maxDocCommentLine                    | 60            | Wrap doc comment lines at given length                                                                                                         | formatDocComments             |
| whitespaceBeforeColon                | true          | Use blank to separate item from following _colon_                                                                                              |                               |
| whitespaceBeforeColonInAnnotation    | false         | Use blank to separate key and _colon_ in _annotations_                                                                                         | whitespaceBeforeColon         |
| whitespaceAfterColon                 | true          | Use blank to separate _colon_ from following item                                                                                              |                               |
| whitespaceAfterColonInAnnotation     | true          | Use blank to separate _colon_ and value in _annotations_                                                                                       | whitespaceAfterColon          |
| whitespaceAfterComma                 | true          | Use blank to separate _comma_ from following item                                                                                              |                               |
| whitespaceAroundAlignedOps           | true          | Use blank before and after aligned _binary operators_ and _colons_ (except colons in annotations)                                              |                               |
| whitespaceAroundBinaryOps            | true          | Use blank before and after _binary operators_                                                                                                  |                               |
| whitespaceWithinBrackets             | false         | Use blank after opening and before closing _brackets_ `{} [] ()`                                                                               |                               |
