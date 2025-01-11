# A _webideDependencies_ section should be declared properly. (_webide-dependencies-consistent_)

## Rule Details

The _webideDependencies_ section in a **package.json** file is an array of SAP Web IDE feature dependencies. If the _webideDependencies_ section exists in the **package.json** file, then each feature in this array should be declared in the _peerDependencies_ section, and be assigned a version in the form of **"\*"** or **"x"** only.

Example of **correct** code for this rule:

```json
{
	"webideDependencies": ["feature1", "feature2"],
	"peerDependencies": { "feature1": "*", "feature2": "x" }
}
```

Example of **incorrect** code for this rule:

```json
/*missing "peerDependencies" section in this case*/
{
	"webideDependencies": ["feature1", "feature2"]
}
```
