
# SYNOPSIS

   *cds export* [ --services ] <patterns> --from <sources> [ ...options ]
   *cds export* [ <sources> ] [ ...options ]

# OPTIONS

   *-s | --services* <patterns>
   *-f | --from* <sources>
   *-2 | --to* <folder>
   *-4 | --for* <npm|mvn>
   *-a | --as* <csn|cdl>

   *-c | --cleanse* <properties>
   *-k | --keep* <kinds>
   *-x | --skip* <kinds>
   *-d | --data*
   *-t | --texts*

   *-y | --dry*
   *-i | --inspect*
   *-f | --force*
   *-h | --help*

   Run with *--debug* to list all options with their defaults.

# EXAMPLES

   *cds export* ?
   *cds export* --help
   *cds export* srv/cat-service.cds --dry
   *cds export* -s cat*s --dry
   *cds export* -s cat*s --cleanse @,all | cds -2 cdl
   *cds export* -s cat*s --inspect=2
   *cds export* -s cat*s --as cdl
   *cds export* -s cat*s
