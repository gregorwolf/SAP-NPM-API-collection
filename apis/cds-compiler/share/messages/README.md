# Message Explanations

This directory contains explanations for various compiler messages.  These
long-form texts are not limited to errors but can also explain info
messages or warnings.

## Structure of an Explanation file

All files are structured the same way:

1. Heading with message-id
2. Short description (one sentence, e.g. the compiler message's text)
3. Default severity (also mention when upgraded to error)
4. Erroneous code example
5. Explanation of the example  
   May also contain a longer explanation of the message.  Also explain why it
   is considered an error).
6. (only if possible) Description of a possible fix
7. Fixed code example
8. Related messages

All markdown conventions of cds-compiler shall be applied to the explanation
files as well.

Furthermore:

- Do not use passive but directly address the user (i.e. "you")  
  Passive is a German thing.
- Use a column width of 80  
  If users open the message in a terminal, it is often 80 characters wide.
  Even if that was not the case, longer lines are harder to read, so keep them
  short.
