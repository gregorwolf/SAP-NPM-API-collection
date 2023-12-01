OData Service Definition Language (OSDL)
========================================

Used to describe and parse OData files

Source: http://help.sap.com/hana/SAP_HANA_Developer_Guide_en.pdf - Chapter 7.1.7 OData Service Definition Language Syntax

EBNF like:

    definition :=service [annotations]
    service :='service' [namespace] body
    namespace :='namespace' quotedstring
    quotedstring :=quote string quote
    string :=UTF8
    quote :='"'
    body :='{' content '}'
    content :=entry [content]
    entry :=( entity | association ) ';'
    entity :=object [entityset] [with] [keys] [navigates] [aggregates] [parameters] [modification]
    object :=['entity'] ( repoobject | catalogobject )
    repoobject :=quote repopackage '/' reponame '.' repoextension quote
    repopackage :=string
    reponame :=string
    repoextension :=string
    catalogobject :=catalogobjectschema '.' catalogobjectname
    catalogobjectschema :=quotedstring
    catalogobjectname :=quotedstring
    entityset :='as' entitysetname
    entitysetname :=quotedstring
    with :=( 'with' | 'without' ) propertylist
    propertylist :='(' columnlist ')'
    columnlist :=columnname [',' columnlist]
    columnname :=quotedstring
    keys :='key' ( keylist | keygenerated )
    keylist :=propertylist
    keygenerated :='generate' ( keygenlocal )
    keygenlocal :='local' columnname
    navigates :='navigates' '(' navlist ')'
    navlist :=naventry [',' navlist]
    naventry :=assocname 'as' navpropname [fromend]
    assocname :=quotedstring
    navpropname :=quotedstring
    fromend :='from' ( 'principal' | 'dependent' )
    aggregates :='aggregates' 'always' [aggregatestuple]
    aggregatestuple :='(' aggregateslist ')'
    aggregateslist :=aggregate [',' aggregateslist]
    aggregate :=aggregatefunction 'of' columnname
    aggregatefunction :=( 'SUM' | 'AVG' | 'MIN' | 'MAX' )
    parameters :='parameters' 'via' [parameterskeyand] 'entity' [parameterentitysetname] [parametersresultsprop]
    parameterskeyand :='key' 'and'
    parameterentitysetname :=quotedstring
    parametersresultsprop :='results' 'property' quotedstring
    modification :=[create] [update] [delete]
    create :='create' modificationspec
    update :='update' modificationspec
    delete :='delete' modificationspec
    modificationspec :=( modificationaction [events] | events | 'forbidden' )
    modificationaction :='using' action
    action :=quotedstring
    events :='events' '(' eventlist ')'
    eventlist :=eventtype action [',' eventlist]
    eventtype :=( 'before' | 'after' | 'precommit' | 'postcommit' )
    association :=associationdef principalend dependentend [( assoctable | storage )]
    associationdef :='association' assocname
    principalend :='principal' end
    dependentend :='dependent' end
    end :=endref multiplicity
    endref :=endtype [joinpropertieslist]
    endtype :=entitysetname
    joinpropertieslist :='(' joinproperties ')'
    joinproperties :=columnlist
    multiplicity :='multiplicity' quote multiplicityvalue quote
    multiplicityvalue :=( '1' | '0..1' | '1..*' | '*' )
    assoctable :='over' repoobject overprincipalend overdependentend [modification]
    overprincipalend :='principal' overend
    overdependentend :='dependent' overend
    overend :=propertylist
    storage :=( nostorage | storageend [modification] )
    nostorage :='no' 'storage'
    storageend :='storage' 'on' ( 'principal' | 'dependent' )
    annotations :='annotations' annotationsbody
    annotationsbody :='{' annotationscontent '}'
    annotationscontent :=annotationconfig [annotationscontent]
    annotationconfig :='enable' annotation
    annotation :='OData4SAP'


    