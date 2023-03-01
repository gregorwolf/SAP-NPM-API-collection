# Analyzing ANTLR (CDS) grammar changes

This sheet lists some helpful commands to understand changes in ANTLR grammars on the level of rule names.
To be run on Linux/macOS.


## Preparation

Run this as a preparation:

```sh
function listRules {
  egrep -o '^\w+' <"$1" | sort
}

GRAMMAR_PATH_1=# insert path to old version of grammar
GRAMMAR_PATH_2=# insert path to new version of grammar
```


## State of a given grammar

Alphabetically list all rules in a given grammar (.g4 file):

```sh
listRules "$GRAMMAR_PATH"
```


## Two versions of a grammar compared

Show a diff of the lists of rules for two grammar versions ('old' and 'new', respectively):

```sh
diff -y --suppress-common-lines <(listRules "$GRAMMAR_PATH_1") <(listRules "$GRAMMAR_PATH_2")
```

This will print lines of the following pattern:
```
[OLD_NAME] SEP [NEW_NAME]
```
where `SEP` is one of the following characters:
- `|`: rule has been renamed (or deleted and a new one created with a different name)
- `<`: rule has been deleted
- `>`: rule has been created
