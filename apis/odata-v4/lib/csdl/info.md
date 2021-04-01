The CSDL objects are used to feed the corresponding EDM objects.
They are returned from the application by using a EdmProvider.

Using the CSDL objects is not mandatory, but a application will profit from some convenience
methods to easily fill an EDM. Of course an EDM can also be filled with using ad hoc created
JSON objects (e.g., { ... }) providing the same attributes as the CSDL objects.
A possible use case may be to store this objects on disk as JSON file if creating is slow
( e.g., backend data required).

Class requirements:

* only attributes allowed
* no class hierarchy
* The Type of the entity set. Must be a full qualified type name

Restrictions

* Unsupported facets
    * **unicode**
        Using [unicode](odata-v4.0-os-part3-csdl.html#_Toc372793915) is not supported.
        When using the CSDL object classes the class attribute *unicode* returns
        always **true**.
