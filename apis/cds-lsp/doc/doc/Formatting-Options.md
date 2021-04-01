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

| Option Key                                | Default Value                 | Description                                                                                                                 | Parent Option                    |
|-------------------------------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| alignAfterKey                             | true                          | Align element identifiers after optional `key` keyword                                                                      |                                  |
| alignAnnotations                          | true                          | Align annotations                                                                                                           |                                  |
| alignPreAnnotations                       | true                          | Align `@` of annotations before items. If multiple annotations exist in a line, they are aligned in a tabular way           | alignAnnotations                 |
| alignPostAnnotations                      | true                          | Align `@` of annotations after items                                                                                        | alignAnnotations                 |
| alignColonsInAnnotations                  | true                          | Align colons in annotations                                                                                                 | alignAnnotations                 |
| alignValuesInAnnotations                  | true                          | Align values in annotations                                                                                                 | alignAnnotations                 |
| alignAs                                   | true                          | Align the `as` keyword                                                                                                      |                                  |
| alignAsInElements                         | true                          | Align the `as` keyword in entity elements                                                                                   | alignAs                          |
| alignAsInEntities                         | true                          | Align the `as` keyword in entities. Alignment scope: encompassing context                                                   | alignAs                          |
| alignAsInSelectItems                      | true                          | Align the `as` keyword in entity `select` items                                                                             | alignAs                          |
| alignAsInUsing                            | true                          | Align the `as` keyword in `using` statements                                                                                | alignAs                          |
| alignExpressionsAndConditions             | true                          | Align parts of expressions and conditions, including left- and right-hand side and operator                                 |                                  |
| alignExprAndCondWithinBlock               | true                          | Align parts of expressions and conditions within the encompassing block rather than throughout the whole statement          | alignExpressionsAndConditions    |
| alignTypes                                | true                          | Align _element types_ within entities, type or annotation specifications                                                    |                                  |
| alignColonsBeforeTypes                    | true                          | Align colons before element types                                                                                           | alignTypes                       |
| alignEqualsAfterTypes                     | true                          | Align assignment operators `=` after element types                                                                          | alignTypes                       |
| alignTypesWithinBlock                     | true                          | Align element types (and colons) within the encompassing block rather than throughout the whole statement                   | alignTypes                       |
| alignCompositionStructToRight             | true                          | Align _structs_ defined in `compositions` to the right                                                                      | alignTypes                       |
| cqlKeywordCapitalization                  | lower                         | How CQL keywords are capitalized: `lower`, `upper`, `title` or `as-is` (cannot be configured locally at this time)          |                                  |
| keepAnnotationsInOriginalLine             | keepLine                      | Either keeps the line structure of annotations (`keepLine`) or wraps each annotation in separate line (`separateLine`)      |                                  |
| keepEmptyBracketsTogether                 | true                          | Keep bracket pairs `{} [] ()` together rather than separating them with whitespace                                          |                                  |
| keepSingleLinedBlocksTogether             | true                          | Avoid single-lined blocks of the same type being separated by empty lines                                                   |                                  |
| keepOriginalEmptyLines                    | false                         | Prevent deletion of consecutive empty lines below the limit. If disabled, allow consecutive empty lines to be removed depending on the context   |             |
| maxKeepEmptyLines                         | 2                             | Maximum number of consecutive _empty lines_ to keep. Empty lines below this limit may still be removed depending on other settings   |                         |
| openingBraceInNewLine                     | false                         | Wrap line before opening brace                                                                                              |                                  |
| selectInNewLine                           | true                          | Start `select` statement of entity or view definition in a new line (indented)                                              |                                  |
| tabSize                                   | 2                             | Specify the number of spaces per indentation level                                                                          |                                  |
| finalNewline                              | true                          | Insert newline character at the end of the file                                                                             |                                  |
| whitespaceBeforeColon                     | true                          | Use blank to separate item from following colon                                                                             |                                  |
| whitespaceAfterColon                      | true                          | Use blank to separate colon from following item                                                                             |                                  |
| whitespaceAfterComma                      | true                          | Use blank to separate comma from following item                                                                             |                                  |
| whitespaceAroundAlignedOps                | true                          | Use blank before and after aligned _binary operators_ and _colons_                                                          |                                  |
| whitespaceAroundBinaryOps                 | true                          | Use blank before and after binary operators                                                                                 |                                  |
| whitespaceWithinBrackets                  | false                         | Use blank after opening and before closing brackets `{} [] ()`                                                              |                                  |
| cancelFormattingOnAlignmentDeadlocks      | false                         | In the unlikely case of alignment deadlocks, cancel formatting instead of continuing                                        |                                  |
