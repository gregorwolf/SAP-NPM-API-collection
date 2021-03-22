# Command Line Migration

> Status Oct 2019: this document is still basically valid.
> The future version of this document (renamed to `CommandLine.md`) will basically explain the recommended CLI options,
> the migration will only be a minor aspect and explained in a later section.

<!-- The option handling might also change: -->
<!-- the backend-specific structure is overly complex and not always appriopriate (e.g. naming mode). -->
<!-- The placement of options should not depend on a not always apparent distinction between command-specific and general options. -->


With revision 1.5.1, the `cdsc` command line interface has been adapted to use commands with
options.

Usage is now `cdsc <command> [options] <files...>` instead of `cdsc [options] <file...>`.

The generation options (`--toHana`, `--toSql`, ...) have been replaced by commands
(`toHana`, `toSql`, ...). This allows for better per-command options, which can now be optional,
can use more single-letter abbreviations, and now match those from the `options` object in the API.

Some examples:

| Old command line        | New command line                           |
| -------------------------- | --------------------------------------------- |
| `cdsc --new-csn --toHana csn,plain foo.cds` | `cdsc --new-csn toHana --csn --names plain foo.cds` |
| `cdsc -R --H csn,plain foo.cds` | `cdsc -R H -c -n plain foo.cds` |
| `cdsc --toOdata xml,v2,separate foo.cds` | `cdsc toOdata --xml --version v2 --separate foo.cds` |
| `cdsc --toSql src foo.cds` | `cdsc toSql foo.cds` |
| `cdsc foo.cds` | `cdsc foo.cds` |

List of commands (as of v1.5.1):

```
  Commands
    H, toHana [options] <files...>     Generate HANA CDS source files
    O, toOdata [options] <files...>    Generate ODATA metadata and annotations
    C, toCdl <files...>                Generate CDS source files
    S, toSwagger [options] <files...>  Generate Swagger (OpenAPI) JSON
    Q, toSql [options] <files...>      Generate SQL DDL statements
       toCsn [options] <files...>      (default) Generate original model as CSN
       toTntSpecificOutput <files...>  (internal) Generate TNT-specific post-processed CSN
       toRename [options] <files...>   (internal) Generate SQL DDL rename statements
```

Please see `cdsc --help` for the list of commands and general options, or `cdsc <command> --help`
for help regarding a specific command.

## Some helpful hints

Please note the following general concepts regarding the new command line:
- General options can be placed anywhere, command specific options must appear after the command.
- In the unlikely case that a file name starts with `-`, please use `--` to indicate the end of options.
- The `src` argument of `toHana`, `toCdl`, `toSql` is now optional (and it would now be `--src`).  
- If no command is specified, the default is `toCsn --flavor client` (as before).
- When no `--out` option is provided or if `-` is specified as output directory , all output will
  go to `<stdout>` instead of being written to files (like before).
- The `--raw-output` option also affects all commands where a CSN file is generated.
  Instead of `...csn.json`, a `...csn_raw.txt` will be produced (like before).
