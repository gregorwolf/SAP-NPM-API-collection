
----
## Use Cases

1. `Delay = 0, MinimumCharacterThreshold = 0`
Result is that a search is performed on each keystroke. This is appropriate for short lists.
2. `Delay = 500, MinimumCharacterThreshold = 0`
Result is a search is performed when a gap of 500ms is detected after the previous entered character. This can be appropriate for short or large lists if paging support is also available.
3. `Delay = 0, MinimumCharacterThreshold = 3`
Result is a search is performed only after 3 characters are entered and immediately for any character count greater than 3.
4. `Delay = 500, MinimumCharacterThreshold = 3`
Result is a search is performed only after 3 characters when a gap of 500ms is detected after the previous entered character.
